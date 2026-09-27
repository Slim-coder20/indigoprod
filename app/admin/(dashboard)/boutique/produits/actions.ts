"use server";

import { z } from "zod";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import {
  euroPrice,
  fieldErrorsOf,
  formValues,
  optionalText,
  requiredText,
  type FormState,
} from "@/lib/admin/forms";
import { isMediaPath } from "@/lib/admin/media";
import { slugify, uniqueSlug } from "@/lib/admin/slug";

const FIELDS = [
  "albumId",
  "name",
  "description",
  "price",
  "quantity",
  "initialQuantity",
  "imageUrl",
  "active",
] as const;

export type ProductField = (typeof FIELDS)[number];
export type ProductFormState = FormState<ProductField>;

const quantity = z
  .string()
  .trim()
  .regex(/^\d{1,6}$/, "Indiquez un nombre entier (0 ou plus).")
  .transform(Number);

const productSchema = z.object({
  albumId: z.string().min(1, "Choisissez la sortie concernée."),
  name: requiredText("Indiquez le nom du produit.", 150),
  description: optionalText(2000),
  price: euroPrice,
  quantity,
  // Quantité affichée au chargement du formulaire (voir updateProduct)
  initialQuantity: z.string(),
  imageUrl: z
    .string()
    .trim()
    .refine((value) => value === "" || isMediaPath(value), "Image invalide.")
    .transform((value) => value || null),
  active: z.string().transform((value) => value === "on"),
});

type ParsedProduct =
  | { ok: true; data: z.infer<typeof productSchema> }
  | { ok: false; state: ProductFormState };

async function parseProduct(formData: FormData): Promise<ParsedProduct> {
  const values = formValues(formData, FIELDS);
  const result = productSchema.safeParse(values);
  if (!result.success) {
    return {
      ok: false,
      state: { fieldErrors: fieldErrorsOf(result.error), values },
    };
  }
  const album = await prisma.album.findUnique({
    where: { id: result.data.albumId },
    select: { id: true },
  });
  if (!album) {
    return {
      ok: false,
      state: {
        fieldErrors: { albumId: "Cette sortie n'existe plus." },
        values,
      },
    };
  }
  return { ok: true, data: result.data };
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = await parseProduct(formData);
  if (!parsed.ok) return parsed.state;
  const { albumId, name, description, price, quantity, imageUrl, active } =
    parsed.data;

  const slug = await uniqueSlug(slugify(name), async (candidate) =>
    Boolean(await prisma.product.findUnique({ where: { slug: candidate } })),
  );

  await prisma.product.create({
    data: {
      slug,
      albumId,
      name,
      description,
      priceCents: price,
      stock: quantity,
      stockRestant: quantity,
      imageUrl,
      active,
    },
  });
  updateTag("releases");
  redirect("/admin/boutique?ok=product-created");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = await parseProduct(formData);
  if (!parsed.ok) return parsed.state;
  const { albumId, name, description, price, quantity, imageUrl, active } =
    parsed.data;

  // On applique l'écart saisi (et non la valeur brute) : une vente passée
  // pendant que le formulaire était ouvert n'est pas effacée.
  const delta = quantity - Number(parsed.data.initialQuantity || quantity);

  // Condition dans la requête : le stock ne peut pas devenir négatif, même
  // si une vente arrive au même instant.
  const { count } = await prisma.product.updateMany({
    where: { id, stockRestant: { gte: -delta } },
    data: {
      albumId,
      name,
      description,
      priceCents: price,
      imageUrl,
      active,
      stock: { increment: delta },
      stockRestant: { increment: delta },
    },
  });
  if (count === 0) {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { stockRestant: true },
    });
    if (!product) return { message: "Ce produit n'existe plus." };
    return {
      fieldErrors: {
        quantity: `Des ventes ont eu lieu entre-temps : il reste ${product.stockRestant} exemplaire(s). Rechargez la page.`,
      },
      values: formValues(formData, FIELDS),
    };
  }

  updateTag("releases");
  redirect("/admin/boutique?ok=product-updated");
}

export async function deleteProduct(id: string) {
  await requireAdmin();

  // Un produit déjà commandé doit rester en base (historique des
  // commandes) : on le désactive au lieu de le supprimer.
  const orders = await prisma.orderItem.count({ where: { productId: id } });
  if (orders > 0) redirect(`/admin/boutique/produits/${id}`);

  await prisma.product.deleteMany({ where: { id } });
  updateTag("releases");
  redirect("/admin/boutique?ok=product-deleted");
}

"use server";

import { z } from "zod";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import {
  fieldErrorsOf,
  formValues,
  isoDate,
  optionalUrl,
  requiredText,
  type FormState,
} from "@/lib/admin/forms";
import { isMediaPath } from "@/lib/admin/media";
import { slugify, uniqueSlug } from "@/lib/admin/slug";

const FIELDS = [
  "artistId",
  "title",
  "type",
  "releaseDate",
  "coverUrl",
  "listenUrl",
] as const;

export type ReleaseField = (typeof FIELDS)[number];
export type ReleaseFormState = FormState<ReleaseField>;

const releaseSchema = z.object({
  artistId: z.string().min(1, "Choisissez un artiste."),
  title: requiredText("Indiquez le titre.", 150),
  type: z.enum(["ALBUM", "SINGLE"], "Choisissez album ou single."),
  // Facultative tant que la date de sortie n'est pas connue
  releaseDate: z.union([
    z.literal("").transform(() => null),
    isoDate("Date invalide."),
  ]),
  coverUrl: z
    .string()
    .trim()
    .refine((value) => value === "" || isMediaPath(value), "Image invalide.")
    .transform((value) => value || null),
  listenUrl: optionalUrl,
});

type ParsedRelease =
  | { ok: true; data: z.infer<typeof releaseSchema>; artistSlug: string }
  | { ok: false; state: ReleaseFormState };

async function parseRelease(formData: FormData): Promise<ParsedRelease> {
  const values = formValues(formData, FIELDS);
  const result = releaseSchema.safeParse(values);
  if (!result.success) {
    return {
      ok: false,
      state: { fieldErrors: fieldErrorsOf(result.error), values },
    };
  }
  const artist = await prisma.artist.findUnique({
    where: { id: result.data.artistId },
    select: { slug: true },
  });
  if (!artist) {
    return {
      ok: false,
      state: {
        fieldErrors: { artistId: "Cet artiste n'existe plus." },
        values,
      },
    };
  }
  return { ok: true, data: result.data, artistSlug: artist.slug };
}

export async function createRelease(
  _prevState: ReleaseFormState,
  formData: FormData,
): Promise<ReleaseFormState> {
  await requireAdmin();
  const parsed = await parseRelease(formData);
  if (!parsed.ok) return parsed.state;

  // Identifiant interne stable, ex. "da-silva-chansons-des-insomnies"
  const slug = await uniqueSlug(
    slugify(`${parsed.artistSlug}-${parsed.data.title}`),
    async (candidate) =>
      Boolean(await prisma.album.findUnique({ where: { slug: candidate } })),
  );

  await prisma.album.create({ data: { ...parsed.data, slug } });
  updateTag("releases");
  redirect("/admin/boutique?ok=release-created");
}

export async function updateRelease(
  id: string,
  _prevState: ReleaseFormState,
  formData: FormData,
): Promise<ReleaseFormState> {
  await requireAdmin();
  const parsed = await parseRelease(formData);
  if (!parsed.ok) return parsed.state;

  const { count } = await prisma.album.updateMany({
    where: { id },
    data: parsed.data,
  });
  if (count === 0) return { message: "Cette sortie n'existe plus." };

  updateTag("releases");
  redirect("/admin/boutique?ok=release-updated");
}

export async function deleteRelease(id: string) {
  await requireAdmin();

  // Ses produits ne seraient plus visibles sur le site (rattachement perdu) :
  // on l'interdit tant qu'elle en a.
  const products = await prisma.product.count({ where: { albumId: id } });
  if (products > 0) redirect(`/admin/boutique/sorties/${id}`);

  await prisma.album.deleteMany({ where: { id } });
  updateTag("releases");
  redirect("/admin/boutique?ok=release-deleted");
}

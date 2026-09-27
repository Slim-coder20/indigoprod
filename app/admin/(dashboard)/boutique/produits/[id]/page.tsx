import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import { centsToEuroInput } from "@/lib/admin/forms";
import { getReleaseOptions } from "@/lib/admin/releases";
import ProductForm from "@/components/admin/ProductForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProduct, updateProduct } from "../actions";

export default async function EditProductPage({
  params,
}: PageProps<"/admin/boutique/produits/[id]">) {
  await requireAdmin();
  const { id } = await params;

  const [product, releases] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { _count: { select: { orderItems: true } } },
    }),
    getReleaseOptions(),
  ]);
  if (!product) notFound();
  const quantity = String(product.stockRestant);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">
        {product.name}
      </h1>
      <ProductForm
        action={updateProduct.bind(null, product.id)}
        releases={releases}
        submitLabel="Enregistrer"
        defaultValues={{
          albumId: product.albumId ?? "",
          name: product.name,
          description: product.description ?? "",
          price: centsToEuroInput(product.priceCents),
          quantity,
          initialQuantity: quantity,
          imageUrl: product.imageUrl ?? "",
          active: product.active ? "on" : "",
        }}
      />

      <section className="max-w-xl border-t border-line pt-6">
        <h2 className="text-sm font-semibold text-foreground">
          Zone de danger
        </h2>
        {product._count.orderItems > 0 ? (
          <p className="mt-1 text-sm text-muted">
            Ce produit a déjà été commandé : il doit être conservé pour
            l&apos;historique des commandes. Décochez « En vente sur le site »
            pour le masquer.
          </p>
        ) : (
          <>
            <p className="mt-1 mb-4 text-sm text-muted">
              La suppression est définitive. Pour le retirer temporairement,
              décochez plutôt « En vente sur le site ».
            </p>
            <DeleteButton
              action={deleteProduct.bind(null, product.id)}
              confirmMessage={`Supprimer définitivement « ${product.name} » ?`}
              label="Supprimer le produit"
            />
          </>
        )}
      </section>
    </div>
  );
}

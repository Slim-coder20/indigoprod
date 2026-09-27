import { requireAdmin } from "@/lib/admin/auth";
import { getReleaseOptions } from "@/lib/admin/releases";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export default async function NewProductPage({
  searchParams,
}: PageProps<"/admin/boutique/produits/nouveau">) {
  await requireAdmin();
  const [{ sortie }, releases] = await Promise.all([
    searchParams,
    getReleaseOptions(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">
        Ajouter un produit
      </h1>
      <ProductForm
        action={createProduct}
        releases={releases}
        submitLabel="Ajouter le produit"
        defaultValues={{
          // Sortie présélectionnée depuis « Ajouter un produit à cette sortie »
          albumId: typeof sortie === "string" ? sortie : "",
          quantity: "0",
          active: "on",
        }}
      />
    </div>
  );
}

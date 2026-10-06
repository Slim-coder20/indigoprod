import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import { formatPrice, formatReleaseDate } from "@/lib/queries/releases";
import FlashMessage from "@/components/admin/FlashMessage";

const FLASH = {
  "release-created": "Sortie ajoutée.",
  "release-updated": "Sortie modifiée.",
  "release-deleted": "Sortie supprimée.",
  "product-created": "Produit ajouté.",
  "product-updated": "Produit modifié.",
  "product-deleted": "Produit supprimé.",
};

const buttonClass =
  "rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover";

export default async function AdminShopPage({
  searchParams,
}: PageProps<"/admin/boutique">) {
  await requireAdmin();
  const { ok } = await searchParams;

  const releases = await prisma.album.findMany({
    orderBy: { releaseDate: { sort: "desc", nulls: "first" } },
    include: {
      artist: { select: { name: true } },
      products: { orderBy: { priceCents: "asc" } },
    },
  });

  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Boutique</h1>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/boutique/sorties/nouveau" className={buttonClass}>
            + Ajouter une sortie
          </Link>
          <Link
            href="/admin/boutique/produits/nouveau"
            className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent"
          >
            + Ajouter un produit
          </Link>
        </div>
      </div>

      <p className="-mt-4 text-sm text-muted">
        Une <strong className="font-medium">sortie</strong> est un album ou un
        single. Ses <strong className="font-medium">produits</strong> (CD,
        vinyle, livre-disque…) sont les éditions vendues dans la boutique.
      </p>

      <FlashMessage message={FLASH[ok as keyof typeof FLASH]} />

      {releases.length === 0 ? (
        <p className="text-sm text-muted">Aucune sortie pour l&apos;instant.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {releases.map((release) => (
            <li
              key={release.id}
              className="rounded-xl border border-line bg-surface"
            >
              <div className="flex items-center gap-4 p-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-ink">
                  {release.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={release.coverUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">
                    {release.title}
                    <span className="ml-2 rounded-full bg-tag px-2 py-0.5 align-middle text-xs font-medium text-on-tag">
                      {release.type === "SINGLE" ? "Single" : "Album"}
                    </span>
                  </p>
                  <p className="text-sm text-muted">
                    {release.artist.name} ·{" "}
                    {release.releaseDate
                      ? formatReleaseDate(
                          release.releaseDate.toISOString().slice(0, 10),
                        )
                      : "date à venir"}
                  </p>
                </div>
                <Link
                  href={`/admin/boutique/sorties/${release.id}`}
                  className="shrink-0 text-sm font-medium text-highlight hover:text-foreground"
                >
                  Modifier
                </Link>
              </div>

              <ul className="divide-y divide-line border-t border-line">
                {release.products.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/admin/boutique/produits/${product.id}`}
                      className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-sm transition-colors hover:bg-surface-strong"
                    >
                      <span
                        className={
                          product.active
                            ? "text-foreground"
                            : "text-subtle line-through"
                        }
                      >
                        {product.name}
                        {!product.active && (
                          <span className="ml-2 inline-block text-xs no-underline">
                            (masqué)
                          </span>
                        )}
                      </span>
                      <span className="flex gap-4">
                        <span className="font-medium text-foreground">
                          {formatPrice(product.priceCents)}
                        </span>
                        <span className="text-muted">
                          {product.shippingCents > 0
                            ? `port ${formatPrice(product.shippingCents)}`
                            : "port offert"}
                        </span>
                        <span
                          className={
                            product.stockRestant <= 0
                              ? "font-medium text-highlight"
                              : "text-muted"
                          }
                        >
                          {product.stockRestant <= 0
                            ? "Épuisé"
                            : `${product.stockRestant} en stock`}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/admin/boutique/produits/nouveau?sortie=${release.id}`}
                    className="block px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface-strong hover:text-foreground"
                  >
                    + Ajouter un produit à cette sortie
                  </Link>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

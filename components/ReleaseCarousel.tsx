import Image from "next/image";
import Link from "next/link";
import AlbumCover from "@/components/AlbumCover";
import Marquee from "@/components/Marquee";
import { formatPrice, type Release } from "@/lib/queries/releases";

// Carrousel des dernières sorties de l'accueil ; chaque carte mène à la boutique.
export default function ReleaseCarousel({ releases }: { releases: Release[] }) {
  return (
    <Marquee
      items={releases}
      getKey={(release) => release.id}
      renderItem={(release, focusable) => (
        <ReleaseCard
          release={release}
          index={releases.indexOf(release)}
          focusable={focusable}
        />
      )}
    />
  );
}

function ReleaseCard({
  release,
  index,
  focusable,
}: {
  release: Release;
  index: number;
  focusable: boolean;
}) {
  const lowestPrice = release.products[0]?.priceCents;
  return (
    <Link
      href="/boutique"
      tabIndex={focusable ? undefined : -1}
      className="block rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
    >
      {release.coverUrl ? (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-ink">
          <Image
            src={release.coverUrl}
            alt={
              focusable
                ? `Pochette de ${release.title} — ${release.artistName}`
                : ""
            }
            fill
            sizes="248px"
            // Le lazy-loading ne se déclenche pas quand une carte entre à
            // l'écran par l'animation (transform) : on charge d'emblée.
            loading="eager"
            className="object-cover"
          />
        </div>
      ) : (
        <AlbumCover index={index} />
      )}
      <div className="mt-4 flex items-center gap-2">
        <p className="truncate text-lg font-semibold text-foreground">
          {release.title}
        </p>
        {release.type === "SINGLE" && (
          <span className="shrink-0 rounded-full bg-tag px-2.5 py-0.5 text-xs font-medium text-on-tag">
            Single
          </span>
        )}
      </div>
      <p className="text-sm text-muted">{release.artistName}</p>
      <p className="mt-2 text-sm font-semibold text-highlight">
        {lowestPrice !== undefined
          ? `${release.products.length > 1 ? "À partir de " : ""}${formatPrice(lowestPrice)}`
          : release.listenUrl
            ? "En écoute libre"
            : "Bientôt disponible"}
      </p>
    </Link>
  );
}

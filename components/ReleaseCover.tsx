import Image from "next/image";
import AlbumCover from "@/components/AlbumCover";
import type { Release } from "@/lib/queries/releases";

// Pochette de la sortie (ou visuel d'une édition via `src`), ou visuel
// provisoire si elle n'en a pas.
export default function ReleaseCover({
  release,
  index,
  sizes,
  src = release.coverUrl,
}: {
  release: Release;
  index: number;
  sizes: string;
  src?: string;
}) {
  if (!src) return <AlbumCover index={index} />;
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-ink">
      <Image
        src={src}
        alt={`Pochette de ${release.title} — ${release.artistName}`}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

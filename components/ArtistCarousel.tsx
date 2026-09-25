import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import type { Artist } from "@/lib/data/artists";

// Carrousel des artistes de l'accueil.
export default function ArtistCarousel({ artists }: { artists: Artist[] }) {
  return (
    <Marquee
      items={artists}
      getKey={(artist) => artist.id}
      renderItem={(artist, focusable) => (
        <ArtistCard artist={artist} focusable={focusable} />
      )}
    />
  );
}

function ArtistCard({
  artist,
  focusable,
}: {
  artist: Artist;
  focusable: boolean;
}) {
  return (
    <Link
      href={`/artistes/${artist.id}`}
      tabIndex={focusable ? undefined : -1}
      className="block overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
        {artist.photo ? (
          <Image
            src={artist.photo}
            alt={focusable ? artist.name : ""}
            fill
            sizes="288px"
            // Le lazy-loading ne se déclenche pas quand une carte entre à
            // l'écran par l'animation (transform) : on charge d'emblée.
            loading="eager"
            className="object-cover"
            style={{ objectPosition: artist.photoPosition }}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-lime">
            {artist.initials}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-lg font-semibold text-foreground">{artist.name}</p>
        {artist.role && (
          <p className="truncate text-sm text-subtle">{artist.role}</p>
        )}
        <p className="mt-2 w-fit rounded-full bg-tag px-3 py-0.5 text-xs font-medium text-on-tag">
          {artist.genre}
        </p>
      </div>
    </Link>
  );
}

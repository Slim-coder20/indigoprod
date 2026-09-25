import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/lib/data/artists";

// Carrousel en défilement continu : la liste est dupliquée et translatée
// de -50 % en boucle. Pause au survol / au focus, et défilement manuel
// si l'utilisateur a demandé à réduire les animations.
export default function ArtistCarousel({ artists }: { artists: Artist[] }) {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
      <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) =>
          artists.map((artist) => (
            <li
              key={`${copy}-${artist.id}`}
              aria-hidden={copy === 1 ? true : undefined}
              className={`w-72 shrink-0 pr-6 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
            >
              <ArtistCard artist={artist} focusable={copy === 0} />
            </li>
          )),
        )}
      </ul>
    </div>
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

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { ARTISTS } from "@/lib/data/artists";

export default function Artistes() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-highlight">
        Artistes
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
        Le roster Indigo <span className="text-[var(--mauve-dark)]">Production</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Des univers musicaux variés, portés par une même exigence artistique.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ARTISTS.map((artist) => (
          <Link
            key={artist.id}
            href={`/artistes/${artist.id}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong"
          >
            {artist.photo ? (
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink">
                <Image
                  src={artist.photo}
                  alt={artist.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: artist.photoPosition }}
                />
              </div>
            ) : (
              <div className="flex aspect-[3/2] w-full items-center justify-center bg-ink">
                <span className="text-4xl font-semibold text-lime">
                  {artist.initials}
                </span>
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              <p className="text-lg font-semibold text-foreground">
                {artist.name}
              </p>
              {artist.role && (
                <p className="text-sm text-subtle">{artist.role}</p>
              )}
              <p className="mt-2 w-fit rounded-full bg-tag px-3 py-0.5 text-xs font-medium text-on-tag">
                {artist.genre}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
                {artist.bio}
              </p>
              <p className="mt-auto pt-4 text-sm font-medium text-highlight group-hover:text-foreground">
                Découvrir →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

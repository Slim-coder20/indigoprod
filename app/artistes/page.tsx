import Container from "@/components/Container";
import { ARTISTS } from "@/lib/data/artists";

export default function Artistes() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-highlight">
        Artistes
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
        Le roster IndigoProduction
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Des univers musicaux variés, portés par une même exigence artistique.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTISTS.map((artist) => (
          <div
            key={artist.id}
            className="rounded-xl border border-line bg-surface p-6"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mauve text-base font-semibold text-ink">
              {artist.initials}
            </div>
            <p className="mt-4 text-lg font-semibold text-foreground">
              {artist.name}
            </p>
            <p className="mt-2 inline-block rounded-full bg-tag px-3 py-0.5 text-xs font-medium text-cream">
              {artist.genre}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              {artist.bio}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}

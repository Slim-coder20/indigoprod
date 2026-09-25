import Container from "@/components/Container";
import { ARTISTS } from "@/lib/data/artists";

export default function Artistes() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
        Artistes
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50">
        Le roster IndigoProduction
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        Des univers musicaux variés, portés par une même exigence artistique.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTISTS.map((artist) => (
          <div
            key={artist.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/20 text-base font-semibold text-indigo-300">
              {artist.initials}
            </div>
            <p className="mt-4 text-lg font-semibold text-zinc-50">
              {artist.name}
            </p>
            <p className="text-sm font-medium text-indigo-400">
              {artist.genre}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {artist.bio}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}

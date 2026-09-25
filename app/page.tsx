import Link from "next/link";
import Container from "@/components/Container";
import { ARTISTS } from "@/lib/data/artists";
import { ALBUMS } from "@/lib/data/albums";
import { CONCERTS } from "@/lib/data/concerts";

export default function Home() {
  const featuredArtists = ARTISTS.slice(0, 3);
  const featuredAlbums = ALBUMS.slice(0, 3);
  const nextConcerts = CONCERTS.slice(0, 3);

  return (
    <>
      <section className="border-b border-zinc-800 bg-gradient-to-b from-indigo-950/40 to-zinc-950">
        <Container className="flex flex-col items-start gap-6 py-24 sm:py-32">
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
            Maison de production musicale
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Nous révélons des artistes, nous produisons des émotions.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-400">
            IndigoProduction accompagne ses artistes de l&apos;enregistrement
            à la scène : albums, tournées et boutique en ligne.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/artistes"
              className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
            >
              Découvrir nos artistes
            </Link>
            <Link
              href="/boutique"
              className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:border-indigo-400 hover:text-indigo-400"
            >
              Voir la boutique
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-zinc-50">
              Nos artistes
            </h2>
            <Link
              href="/artistes"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              Tous les artistes →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featuredArtists.map((artist) => (
              <div
                key={artist.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
                  {artist.initials}
                </div>
                <p className="mt-4 text-lg font-semibold text-zinc-50">
                  {artist.name}
                </p>
                <p className="text-sm text-indigo-400">{artist.genre}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-900/30 py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-zinc-50">
              Dernières sorties
            </h2>
            <Link
              href="/boutique"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              Toute la boutique →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featuredAlbums.map((album) => (
              <div
                key={album.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-indigo-500/30 to-zinc-800" />
                <p className="mt-4 text-lg font-semibold text-zinc-50">
                  {album.albumTitle}
                </p>
                <p className="text-sm text-zinc-400">{album.artistName}</p>
                <p className="mt-2 text-sm font-medium text-indigo-400">
                  {album.price.toFixed(2)} €
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-zinc-50">
              Prochains concerts
            </h2>
            <Link
              href="/concerts"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              Tous les concerts →
            </Link>
          </div>
          <div className="mt-8 divide-y divide-zinc-800 rounded-xl border border-zinc-800">
            {nextConcerts.map((concert) => (
              <div
                key={concert.id}
                className="flex flex-col justify-between gap-2 p-6 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-zinc-50">
                    {concert.artistName}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {concert.venue}, {concert.city}
                  </p>
                </div>
                <p className="text-sm font-medium text-indigo-400">
                  {new Date(concert.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-800 bg-indigo-950/30 py-16">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-50">
              Une question, un projet ?
            </h2>
            <p className="mt-2 text-zinc-400">
              Contactez notre équipe, nous vous répondons rapidement.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
          >
            Nous contacter
          </Link>
        </Container>
      </section>
    </>
  );
}

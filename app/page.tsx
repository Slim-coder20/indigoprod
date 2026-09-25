import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import AlbumCover from "@/components/AlbumCover";
import ArtistCarousel from "@/components/ArtistCarousel";
import { getArtists } from "@/lib/queries/artists";
import { ALBUMS } from "@/lib/data/albums";
import { CONCERTS } from "@/lib/data/concerts";
import logo from "@/public/logo-indigo.png";

export default async function Home() {
  const artists = await getArtists();
  const featuredAlbums = ALBUMS.slice(0, 3);
  const nextConcerts = CONCERTS.slice(0, 3);

  return (
    <>
      <section className="border-b border-line bg-background">
        <Container className="grid grid-cols-1 items-center gap-12 py-24 sm:py-32 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <p className="text-sm font-medium uppercase tracking-widest text-highlight">
              Maison de production musicale
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Nous révélons des artistes, nous produisons des{" "}
              <span className="text-[var(--mauve-dark)]">émotions</span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted">
              IndigoProduction accompagne ses artistes de l&apos;enregistrement
              à la scène : albums, tournées et boutique en ligne.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/artistes"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
              >
                Découvrir nos artistes
              </Link>
              <Link
                href="/boutique"
                className="rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Voir la boutique
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src={logo}
              alt="Logo Indigo"
              loading="eager"
              className="h-auto w-full max-w-sm"
            />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Nos artistes
            </h2>
            <Link
              href="/artistes"
              className="text-sm font-medium text-highlight transition-colors hover:text-accent"
            >
              Tous les artistes →
            </Link>
          </div>
        </Container>
        <Container className="mt-8">
          <ArtistCarousel artists={artists} />
        </Container>
      </section>

      <section className="border-y border-line bg-surface-strong py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Dernières sorties
            </h2>
            <Link
              href="/boutique"
              className="text-sm font-medium text-highlight transition-colors hover:text-accent"
            >
              Toute la boutique →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featuredAlbums.map((album, index) => (
              <div
                key={album.id}
                className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
              >
                <AlbumCover index={index} />
                <p className="mt-4 text-lg font-semibold text-foreground">
                  {album.albumTitle}
                </p>
                <p className="text-sm text-muted">{album.artistName}</p>
                <p className="mt-2 text-sm font-semibold text-highlight">
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
            <h2 className="text-2xl font-semibold text-foreground">
              Prochains concerts
            </h2>
            <Link
              href="/concerts"
              className="text-sm font-medium text-highlight transition-colors hover:text-accent"
            >
              Tous les concerts →
            </Link>
          </div>
          <div className="mt-8 divide-y divide-line rounded-xl border border-line">
            {nextConcerts.map((concert) => (
              <div
                key={concert.id}
                className="flex flex-col justify-between gap-2 p-6 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {concert.artistName}
                  </p>
                  <p className="text-sm text-muted">
                    {concert.venue}, {concert.city}
                  </p>
                </div>
                <p className="font-mono text-sm font-medium text-highlight">
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

      <section className="bg-band py-16 text-on-band">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-on-band">
              Une question, un projet ?
            </h2>
            <p className="mt-2 text-on-band-muted">
              Contactez notre équipe, nous vous répondons rapidement.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-mauve"
          >
            Nous contacter
          </Link>
        </Container>
      </section>
    </>
  );
}

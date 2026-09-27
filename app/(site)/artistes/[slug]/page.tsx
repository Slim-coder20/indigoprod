import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import SocialLinks from "@/components/SocialLinks";
import { getArtistBySlug, getArtists } from "@/lib/queries/artists";

export async function generateStaticParams() {
  const artists = await getArtists();
  return artists.map((artist) => ({ slug: artist.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/artistes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) return {};
  return {
    title: `${artist.name} — IndigoProduction`,
    description: artist.bio,
  };
}

export default async function ArtistePage({
  params,
}: PageProps<"/artistes/[slug]">) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) notFound();

  const paragraphs = artist.biography ?? [artist.bio];

  return (
    <Container className="py-16">
      <Link
        href="/artistes"
        className="text-sm font-medium text-highlight transition-colors hover:text-foreground"
      >
        ← Tous les artistes
      </Link>

      <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-5">
        <figure className="lg:col-span-3">
          {artist.video ? (
            <video
              controls
              playsInline
              preload="none"
              poster={artist.video.poster}
              aria-label={`${artist.name} — ${artist.video.title}`}
              className="aspect-video w-full rounded-xl bg-ink"
            >
              <source src={artist.video.src} type="video/mp4" />
            </video>
          ) : artist.photo ? (
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-ink">
              <Image
                src={artist.photo}
                alt={artist.name}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
                style={{ objectPosition: artist.photoPosition }}
              />
            </div>
          ) : (
            <div className="flex aspect-[3/2] w-full items-center justify-center rounded-xl bg-ink">
              <span className="text-6xl font-semibold text-lime">
                {artist.initials}
              </span>
            </div>
          )}
          {artist.video ? (
            <figcaption className="mt-2 text-xs text-subtle">
              {artist.video.title}
            </figcaption>
          ) : (
            artist.photoCredit && (
              <figcaption className="mt-2 text-xs text-subtle">
                Photo © {artist.photoCredit}
              </figcaption>
            )
          )}
        </figure>

        <div className="lg:col-span-2">
          {artist.role && (
            <p className="text-sm font-medium uppercase tracking-widest text-highlight">
              {artist.role}
            </p>
          )}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {artist.name}
          </h1>
          <p className="mt-4 w-fit rounded-full bg-tag px-3 py-0.5 text-xs font-medium text-on-tag">
            {artist.genre}
          </p>
          {artist.socials && artist.socials.length > 0 && (
            <div className="mt-8">
              <SocialLinks links={artist.socials} />
            </div>
          )}
        </div>
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold text-foreground">Biographie</h2>
        <div className="mt-6 flex flex-col gap-5 text-lg leading-8 text-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>
    </Container>
  );
}

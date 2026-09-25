import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type Release = {
  id: string; // slug
  title: string;
  artistName: string;
  artistSlug: string;
  type: "ALBUM" | "SINGLE";
  releaseDate?: string; // ISO 8601 (AAAA-MM-JJ), absente si inconnue
  coverUrl?: string;
  listenUrl?: string;
  // Éditions vendues en boutique (vide si la sortie n'est pas en vente)
  products: ReleaseProduct[];
};

export type ReleaseProduct = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  imageUrl?: string;
  priceCents: number;
  stockRestant: number;
};

// Toutes les sorties, de la plus récente à la plus ancienne (les dates
// inconnues en premier : ce sont en pratique les sorties à venir ou récentes).
// Mis en cache 1 h ; revalidateTag("releases") force le rafraîchissement.
export const getReleases = unstable_cache(
  async (): Promise<Release[]> => {
    const albums = await prisma.album.findMany({
      orderBy: { releaseDate: { sort: "desc", nulls: "first" } },
      include: {
        artist: { select: { name: true, slug: true } },
        products: {
          where: { active: true },
          orderBy: { priceCents: "asc" },
          select: {
            id: true,
            slug: true,
            name: true,
            description: true,
            imageUrl: true,
            priceCents: true,
            stockRestant: true,
          },
        },
      },
    });
    return albums.map((album) => ({
      id: album.slug,
      title: album.title,
      artistName: album.artist.name,
      artistSlug: album.artist.slug,
      type: album.type,
      releaseDate: album.releaseDate?.toISOString().slice(0, 10),
      coverUrl: album.coverUrl ?? undefined,
      listenUrl: album.listenUrl ?? undefined,
      products: album.products.map((product) => ({
        ...product,
        description: product.description ?? undefined,
        imageUrl: product.imageUrl ?? undefined,
      })),
    }));
  },
  ["releases"],
  { tags: ["releases"], revalidate: 3600 },
);

// Lien Spotify « open.spotify.com/…/album/ID » -> lecteur intégrable.
export function spotifyEmbedUrl(url: string): string | undefined {
  const match = url.match(
    /open\.spotify\.com\/(?:[\w-]+\/)?(album|track|playlist)\/(\w+)/,
  );
  return match
    ? `https://open.spotify.com/embed/${match[1]}/${match[2]}`
    : undefined;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export function formatReleaseDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { Artist as ArtistRow } from "@/lib/generated/prisma/client";
import type { Artist, SocialLink } from "@/lib/data/artists";

// Convertit une ligne de la table `artists` au format utilisé par les composants.
function toArtist(row: ArtistRow): Artist {
  return {
    id: row.slug,
    name: row.name,
    role: row.role ?? undefined,
    genre: row.genre,
    bio: row.bio,
    biography: row.biography.length > 0 ? row.biography : undefined,
    initials: row.name
      .split(/\s+/)
      .filter((word) => /^\p{L}/u.test(word))
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
    photo: row.photoUrl ?? undefined,
    photoPosition: row.photoPosition ?? undefined,
    photoCredit: row.photoCredit ?? undefined,
    video: row.videoUrl
      ? {
          src: row.videoUrl,
          poster: row.videoPosterUrl ?? undefined,
          title: row.videoTitle ?? "",
        }
      : undefined,
    socials: (row.socials as SocialLink[] | null) ?? undefined,
  };
}

// Mis en cache 1 h ; revalidateTag("artists") force le rafraîchissement.
export const getArtists = unstable_cache(
  async (): Promise<Artist[]> => {
    const rows = await prisma.artist.findMany({
      orderBy: { createdAt: "asc" },
    });
    return rows.map(toArtist);
  },
  ["artists"],
  { tags: ["artists"], revalidate: 3600 },
);

export const getArtistBySlug = unstable_cache(
  async (slug: string): Promise<Artist | null> => {
    const row = await prisma.artist.findUnique({ where: { slug } });
    return row ? toArtist(row) : null;
  },
  ["artist-by-slug"],
  { tags: ["artists"], revalidate: 3600 },
);

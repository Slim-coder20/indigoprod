import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type Concert = {
  id: string; // slug
  title?: string;
  artistName: string;
  artistSlug: string;
  venue: string;
  city: string;
  date: string; // AAAA-MM-JJ
  ticketUrl?: string;
};

// Concerts à venir (aujourd'hui inclus), du plus proche au plus lointain.
// Mis en cache 1 h ; revalidateTag("concerts") force le rafraîchissement.
export const getUpcomingConcerts = unstable_cache(
  async (): Promise<Concert[]> => {
    const today = new Date(new Date().toISOString().slice(0, 10));
    const concerts = await prisma.concert.findMany({
      where: { date: { gte: today } },
      orderBy: { date: "asc" },
      include: { artist: { select: { name: true, slug: true } } },
    });
    return concerts.map((concert) => ({
      id: concert.slug,
      title: concert.title ?? undefined,
      artistName: concert.artist.name,
      artistSlug: concert.artist.slug,
      venue: concert.venue,
      city: concert.city,
      date: concert.date.toISOString().slice(0, 10),
      ticketUrl: concert.ticketUrl ?? undefined,
    }));
  },
  ["upcoming-concerts"],
  { tags: ["concerts"], revalidate: 3600 },
);

export function formatConcertDate(
  isoDate: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  },
): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("fr-FR", {
    ...options,
    timeZone: "UTC",
  });
}

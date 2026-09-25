// Concerts utilisés par prisma/seed.ts pour remplir la table `concerts`.
// Le site lit la base via lib/queries/concerts.ts.
export type ConcertSeed = {
  slug: string;
  artistSlug: string; // slug de l'artiste dans la table `artists`
  title?: string; // nom de l'événement
  venue: string;
  city: string;
  date: string; // AAAA-MM-JJ
  ticketUrl?: string;
};

export const CONCERTS: ConcertSeed[] = [
  {
    slug: "slim-abida-2026-10-18-paris",
    artistSlug: "slim-abida",
    title: "Festival Jazz à la Cité",
    venue: "Maison de la Tunisie",
    city: "Paris",
    date: "2026-10-18",
  },
  {
    slug: "slim-abida-2026-10-30-tun-jazz",
    artistSlug: "slim-abida",
    title: "Festival Tun Jazz",
    venue: "Festival Tun Jazz",
    city: "Tunis – Bizerte",
    date: "2026-10-30",
  },
  {
    slug: "slim-abida-2027-02-10-jass-club",
    artistSlug: "slim-abida",
    venue: "Jass Club",
    city: "Paris",
    date: "2027-02-10",
  },
];

export type Concert = {
  id: string;
  artistName: string;
  venue: string;
  city: string;
  date: string; // ISO 8601
};

export const CONCERTS: Concert[] = [
  {
    id: "nova-ekwueme-paris",
    artistName: "Nova Ekwueme",
    venue: "La Cigale",
    city: "Paris",
    date: "2026-11-14",
  },
  {
    id: "kali-mareva-lyon",
    artistName: "Kali Mareva",
    venue: "Le Transbordeur",
    city: "Lyon",
    date: "2026-11-28",
  },
  {
    id: "les-eclipses-bordeaux",
    artistName: "Les Éclipses",
    venue: "Rocher de Palmer",
    city: "Bordeaux",
    date: "2026-12-05",
  },
  {
    id: "tsura-marseille",
    artistName: "Tsura",
    venue: "Le Cabaret Aléatoire",
    city: "Marseille",
    date: "2026-12-19",
  },
];

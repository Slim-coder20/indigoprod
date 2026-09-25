export type Artist = {
  id: string;
  name: string;
  genre: string;
  bio: string;
  initials: string;
};

export const ARTISTS: Artist[] = [
  {
    id: "nova-ekwueme",
    name: "Nova Ekwueme",
    genre: "Pop électronique",
    bio: "Voix singulière et productions solaires, Nova explore les frontières entre pop et électronique depuis 2021.",
    initials: "NE",
  },
  {
    id: "leo-solstice",
    name: "Léo Solstice",
    genre: "Folk indé",
    bio: "Auteur-compositeur originaire de Bretagne, Léo tisse des textes intimistes sur des arrangements acoustiques.",
    initials: "LS",
  },
  {
    id: "kali-mareva",
    name: "Kali Mareva",
    genre: "Soul / R&B",
    bio: "Une soul contemporaine portée par une écriture engagée et des lives puissants.",
    initials: "KM",
  },
  {
    id: "les-eclipses",
    name: "Les Éclipses",
    genre: "Rock alternatif",
    bio: "Groupe formé à Lyon, Les Éclipses enflamment les scènes avec un rock nerveux et mélodique.",
    initials: "LE",
  },
  {
    id: "mano-verlaine",
    name: "Mano Verlaine",
    genre: "Chanson française",
    bio: "Héritier d'une tradition de chanson française revisitée avec des arrangements modernes.",
    initials: "MV",
  },
  {
    id: "tsura",
    name: "Tsura",
    genre: "Électro / Ambient",
    bio: "Productrice et DJ, Tsura façonne des paysages sonores hypnotiques entre club et ambient.",
    initials: "TS",
  },
];

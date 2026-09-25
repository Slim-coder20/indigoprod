// Modélise la future table Postgres `product` (voir CLAUDE.md, étape 2).
// Données statiques en attendant la connexion à la base de données.
export type Album = {
  id: string;
  artistName: string;
  albumTitle: string;
  releaseDate: string; // ISO 8601
  price: number; // en euros
  stock: number; // stock initial
  stockRestant: number; // stock restant à vendre
};

export const ALBUMS: Album[] = [
  {
    id: "nova-ekwueme-horizons",
    artistName: "Nova Ekwueme",
    albumTitle: "Horizons",
    releaseDate: "2025-03-14",
    price: 19.9,
    stock: 500,
    stockRestant: 128,
  },
  {
    id: "leo-solstice-embers",
    artistName: "Léo Solstice",
    albumTitle: "Embers",
    releaseDate: "2024-11-02",
    price: 17.5,
    stock: 300,
    stockRestant: 42,
  },
  {
    id: "kali-mareva-marees",
    artistName: "Kali Mareva",
    albumTitle: "Marées",
    releaseDate: "2025-06-20",
    price: 21.0,
    stock: 400,
    stockRestant: 361,
  },
  {
    id: "les-eclipses-nuit-blanche",
    artistName: "Les Éclipses",
    albumTitle: "Nuit Blanche",
    releaseDate: "2023-09-08",
    price: 16.9,
    stock: 250,
    stockRestant: 0,
  },
  {
    id: "mano-verlaine-lisiere",
    artistName: "Mano Verlaine",
    albumTitle: "Lisière",
    releaseDate: "2025-01-17",
    price: 18.9,
    stock: 350,
    stockRestant: 210,
  },
  {
    id: "tsura-echoes",
    artistName: "Tsura",
    albumTitle: "Echoes",
    releaseDate: "2024-05-30",
    price: 20.5,
    stock: 300,
    stockRestant: 87,
  },
];

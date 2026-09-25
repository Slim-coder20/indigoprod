// Sorties utilisées par prisma/seed.ts pour remplir les tables `albums` et
// `products`. Le site lit la base via lib/queries/releases.ts.
export type ProductSeed = {
  slug: string; // identifiant stable du produit
  name: string;
  description?: string;
  priceCents: number;
  stock: number; // stock initial
  imageUrl?: string; // sinon la pochette de l'album
};

export type ReleaseSeed = {
  slug: string;
  artistSlug: string; // slug de l'artiste dans la table `artists`
  title: string;
  type: "ALBUM" | "SINGLE";
  releaseDate?: string; // ISO 8601, facultative si inconnue
  coverUrl: string; // chemin dans /public
  listenUrl?: string; // écoute libre (Spotify…)
  products?: ProductSeed[]; // éditions vendues en boutique
};

// Stocks provisoires (100), à remplacer par les stocks réels.
export const RELEASES: ReleaseSeed[] = [
  {
    slug: "slim-abida-the-beginnings",
    artistSlug: "slim-abida",
    title: "The Beginnings",
    type: "SINGLE",
    releaseDate: "2026-06-21",
    coverUrl: "/albums/contrast.jpg",
    listenUrl: "https://open.spotify.com/intl-fr/album/5rInmdhgFLs3lpmvFEu3r7",
  },
  {
    slug: "da-silva-chansons-des-insomnies",
    artistSlug: "da-silva",
    title: "Chansons des Insomnies",
    type: "ALBUM",
    coverUrl: "/albums/da-silva-chansons-des-insomnies-vinyle.jpg",
    products: [
      {
        slug: "da-silva-chansons-des-insomnies-vinyle",
        name: "Vinyle Chansons des Insomnies + carte de téléchargement",
        description:
          "20 ans de carrière, 20 ans de L'Indécision… Un anniversaire à célébrer ! Mon 11e album : Chansons des Insomnies, suite logique de Grand Hôtel. Plus de 80 chansons écrites durant mes nuits d'insomnie. J'en ai sélectionné 10 pour ce disque.",
        priceCents: 3500,
        stock: 100,
      },
      {
        slug: "da-silva-carnet-d-insomnie-livre-disque",
        name: "Livre-disque Carnet d'Insomnie",
        description:
          "20 ans de carrière, 20 ans de L'Indécision… Un anniversaire à célébrer ! Carnet d'Insomnie, un livre-disque qui réunit mes dessins, poèmes, textes et mon 11e album, Chansons des Insomnies.",
        priceCents: 4000,
        stock: 100,
        imageUrl: "/albums/da-silva-carnet-d-insomnie.jpg",
      },
    ],
  },
  {
    slug: "slim-abida-asymetrie",
    artistSlug: "slim-abida",
    title: "Asymétrie",
    type: "ALBUM",
    releaseDate: "2022-05-27",
    coverUrl: "/albums/asymetrie.jpg",
    products: [
      {
        slug: "slim-abida-asymetrie",
        name: "Asymétrie",
        priceCents: 1500,
        stock: 100,
      },
    ],
  },
  {
    slug: "slim-abida-frequences-basses",
    artistSlug: "slim-abida",
    title: "Fréquences Basses",
    type: "ALBUM",
    releaseDate: "2020-02-21",
    coverUrl: "/albums/frequences-basses.jpg",
    products: [
      {
        slug: "slim-abida-frequences-basses",
        name: "Fréquences Basses",
        priceCents: 1500,
        stock: 100,
      },
    ],
  },
];

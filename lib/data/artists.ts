// Données des artistes utilisées par prisma/seed.ts pour remplir la table
// `artists`. Le site lit la base via lib/queries/artists.ts.

export type SocialLink = {
  label: "Site web" | "Instagram" | "Facebook" | "YouTube" | "Spotify";
  url: string;
};

export type ArtistVideo = {
  src: string; // chemin dans /public
  poster?: string; // image affichée avant la lecture
  title: string;
};

export type Artist = {
  id: string; // sert aussi de slug pour /artistes/[slug]
  name: string;
  role?: string;
  genre: string;
  bio: string; // résumé court affiché sur les cartes
  biography?: string[]; // biographie complète, un paragraphe par entrée
  initials: string;
  photo?: string; // chemin dans /public
  photoPosition?: string; // cadrage CSS object-position, ex. "center 20%"
  photoCredit?: string;
  video?: ArtistVideo; // remplace la photo sur la fiche artiste
  socials?: SocialLink[];
};

export const ARTISTS: Artist[] = [
  {
    id: "slim-abida",
    name: "Slim Abida",
    role: "Bassiste compositeur",
    genre: "Jazz-Fusion",
    bio: "Bassiste, compositeur et architecte sonore, Slim Abida s'est imposé en une décennie comme une figure incontournable du Jazz-Fusion contemporain en Tunisie.",
    biography: [
      "Bassiste, compositeur et architecte sonore, Slim Abida s'est imposé en une décennie comme une figure incontournable du Jazz-Fusion contemporain en Tunisie. Avec quatre albums à son actif (dont le très attendu Contrast), il déconstruit les genres pour bâtir une musique électrique, nerveuse et profondément cinématographique. Ici, la virtuosité de la basse ne sert qu'un seul but : l'intensité du récit.",
      "Arrivé en France en 2011, Slim Abida n'a cessé d'explorer les résonances entre ses racines méditerranéennes et l'effervescence du jazz moderne. De l'aventure Jazz Oil à ses projets en leader (Asymétrie, Fréquences Basses), il a affiné une signature unique où les rythmes asymétriques rencontrent des textures urbaines. Son jeu, à la fois ancré et aérien, fait de lui un coloriste de la basse, capable de transformer un quartet en une véritable machine à groove.",
      "Avec son nouvel opus Contrast, Slim Abida franchit une nouvelle étape. Plus électrique, plus audacieux, l'album explore les tensions entre ombre et lumière, entre improvisation organique et rigueur compositionnelle. Accompagné d'un line-up d'exception, il propose une expérience live immersive qui dépasse les frontières du jazz académique pour toucher à l'essence d'une musique progressive et universelle.",
    ],
    initials: "SA",
    photo: "/artistes/slim-abida.jpg",
    photoCredit: "Yassine Meddeb Hamrouni",
    video: {
      src: "/artistes/videos/slim-abida-father-solo-bass.mp4",
      poster: "/artistes/videos/slim-abida-father-solo-bass.jpg",
      title: "Father — solo de basse",
    },
    socials: [
      { label: "Site web", url: "https://www.slimabida.fr/" },
      {
        label: "Instagram",
        url: "https://www.instagram.com/slimabidaproject/",
      },
      { label: "Facebook", url: "https://www.facebook.com/slimabidaproject/" },
      { label: "YouTube", url: "https://www.youtube.com/@slimabidaproject" },
      {
        label: "Spotify",
        url: "https://open.spotify.com/intl-fr/artist/5VGx7T3WkMIB5stG6jBi6h",
      },
    ],
  },
  {
    id: "da-silva",
    name: "Da Silva",
    role: "Chanteur, interprète et compositeur",
    genre: "Chanson française",
    bio: "Est né le 15 avril 1976 à Nevers. Du groupe de punk rock nivernais, les Mad Coakroches, à Mitsu, en passant par les Tambours du Bronx, Punishment Park, et Vénus Coma, du punk rock français à la musique électronique, la jeunesse de cet adolescent surdoué fut un prélude à ce que l’homme allait devenir : Da Silva, l’artiste caméléon, prolifique, l’auteur chanteur compositeur capable de toutes les collaborations et de toutes les aventures artistiques.\nIl s’est fait connaître du grand public avec « L’Indécision », extrait de l’album « Décembre en été » en 2005. L’album a été certifié disque d’or et sa trajectoire scénique lui a valu une nomination aux Victoires de la musique en 2007. Depuis, il a construit une discographie de plus de 10 albums, portée par une chanson populaire exigeante et plusieurs titres devenus emblématiques. 9 titres se sont classés au Top 50 Radio, parmi lesquels « Le carnaval » « L’Indécision » et « De là-haut » Son travail s’étend également à l’écriture et à la composition pour d’autres interprètes, à la réalisation d’albums et aux livres pour la jeunesse. « Le Petit Nuage » a été salué par le prix Charles Cros en 2019.",
    biography: [
      "Est né le 15 avril 1976 à Nevers. Du groupe de punk rock nivernais, les Mad Coakroches, à Mitsu, en passant par les Tambours du Bronx, Punishment Park, et Vénus Coma, du punk rock français à la musique électronique, la jeunesse de cet adolescent surdoué fut un prélude à ce que l’homme allait devenir : Da Silva, l’artiste caméléon, prolifique, l’auteur chanteur compositeur capable de toutes les collaborations et de toutes les aventures artistiques.",
      "Il s’est fait connaître du grand public avec « L’Indécision », extrait de l’album « Décembre en été » en 2005. L’album a été certifié disque d’or et sa trajectoire scénique lui a valu une nomination aux Victoires de la musique en 2007. Depuis, il a construit une discographie de plus de 10 albums, portée par une chanson populaire exigeante et plusieurs titres devenus emblématiques. 9 titres se sont classés au Top 50 Radio, parmi lesquels « Le carnaval » « L’Indécision » et « De là-haut » Son travail s’étend également à l’écriture et à la composition pour d’autres interprètes, à la réalisation d’albums et aux livres pour la jeunesse. « Le Petit Nuage » a été salué par le prix Charles Cros en 2019.",
    ],
    initials: "DS",
    photo: "/artistes/da-silva.webp",
    photoPosition: "center 5%",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/dasilvaofficiel/" },
      { label: "Facebook", url: "https://www.facebook.com/DaSilva.Officiel" },
      { label: "YouTube", url: "https://www.youtube.com/@OfficielDaSilva" },
      {
        label: "Spotify",
        url: "https://open.spotify.com/artist/2DOrhe8H1WfcD6PPkgJH8X",
      },
    ],
  },
  {
    id: "duo-garcia",
    name: "Samuel & Elie Garcia",
    role: "Duo rubab et percussions",
    genre: "Musiques du monde",
    bio: "Entre le Maghreb, le Proche et le Moyen-Orient, le duo Garcia propose un voyage musical revisité à travers les sonorités singulières du rubab (luth afghan), et de la darbouka égyptienne/set de percussions.",
    biography: [
      "Entre le Maghreb, le Proche et le Moyen-Orient, le duo Garcia propose un voyage musical revisité à travers les sonorités singulières du rubab (luth afghan), et de la darbouka égyptienne/set de percussions.",
      "Elie et Samuel font dialoguer ces traditions musicales dans un format intimiste, mêlant répertoire populaire et classique.",
      "Leur travail d'interprétation et d'arrangement pour duo permet de redécouvrir certaines pièces initialement composées pour de grands ensembles, notamment celles de compositeurs emblématiques tels que Rabih Abou-Khalil (Liban) ou Mohamed Abdel Wahab (Égypte), ainsi que des musiques populaires venues d'Afghanistan et de Turquie.",
    ],
    initials: "SE",
    photo: "/artistes/duo-garcia.jpg",
    photoPosition: "center 25%",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/eliegarcia37/" },
      { label: "YouTube", url: "https://www.youtube.com/@eliegarcia1776" },
    ],
  },
  {
    id: "django-jazz-quartet",
    name: "Django Jazz Quartet",
    role: "Quartet de jazz manouche",
    genre: "Jazz manouche",
    bio: "Django Jazz Quartet, la fusion de quatre musiciens passionnés par l'œuvre de Django Reinhardt et Stéphane Grappelli. Un style Jazz Manouche sur mesure pour accompagner le Chant Tzigane en authentique langue Romanès.",
    initials: "DJ",
    photo: "/artistes/django-jazz-quartet.webp",
    socials: [
      { label: "Site web", url: "https://djangojazzquartet.com/" },
      {
        label: "Instagram",
        url: "https://www.instagram.com/djangojazzquartet/",
      },
      {
        label: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61586175928769",
      },
      { label: "YouTube", url: "https://www.youtube.com/@DjangoJazzQuartet" },
    ],
  },
];

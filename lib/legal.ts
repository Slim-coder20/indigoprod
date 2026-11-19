// Informations légales de l'entreprise, partagées entre les mentions légales,
// les CGV, la politique de confidentialité et le footer.
//
// Les valeurs « À COMPLÉTER » s'affichent en surbrillance sur le site : à
// remplacer par les vraies informations de la cliente AVANT la mise en ligne
// (rechercher `LEGAL_TODO` ou « À COMPLÉTER » dans le projet).
export const LEGAL_TODO = "À COMPLÉTER";

export const LEGAL = {
  brand: "IndigoProduction",
  // Entité qui vend sur la boutique (Indigo Prod ou Indigo Records)
  companyName: "INDIGO PROD’", // raison sociale ou nom de l'entrepreneur
  legalForm: "Association déclarée (loi du 1er juillet 1901)",
  siren: "927 905 802",
  siret: "927 905 802 00017",
  ape: "90.01Z — Arts du spectacle vivant",
  address: "29 rue de la Moquerie, 37000 Tours", // adresse du siège
  shareCapital: "Sans objet", // sociétés uniquement, sinon « sans objet »
  rcs: "Répertoire national des associations (RNA) : W372020110", // ex. « RCS Tours 123 456 789 », sinon « sans objet »
  vat: "TVA non applicable, article 293 B du CGI", // n° de TVA intracommunautaire, ou « TVA non applicable, art. 293 B du CGI »
  email: "contact.indigoprod@gmail.com", // adresse e-mail publique (mentions légales, CGV)
  publicationDirector: "Noria Bouha",

  // Boutique
  deliveryDelay: "préparation sous 1 à 3 jours ouvrés après paiement, puis délai d'acheminement DPD", // ex. « 5 à 10 jours ouvrés après la commande »
  carrier: "DPD", // ex. « La Poste (Colissimo) »
  returnAddress: "29 rue de la Moquerie, 37000 Tours, France", // adresse de retour (souvent l'adresse du siège)

  // Médiateur de la consommation (obligatoire pour la vente aux particuliers)
  mediator: { name: LEGAL_TODO, website: LEGAL_TODO },

  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    website: "https://vercel.com",
  },

  // Date de dernière mise à jour des textes
  updatedAt: "6 octobre 2026",
};

export const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "Conditions générales de vente" },
  { href: "/confidentialite", label: "Confidentialité" },
] as const;

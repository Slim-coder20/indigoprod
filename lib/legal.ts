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
  companyName: LEGAL_TODO, // raison sociale ou nom de l'entrepreneur
  legalForm: LEGAL_TODO, // ex. SAS, SARL, entreprise individuelle, association
  siret: LEGAL_TODO,
  address: LEGAL_TODO, // adresse du siège (rue, code postal, ville)
  shareCapital: LEGAL_TODO, // sociétés uniquement, sinon « sans objet »
  rcs: LEGAL_TODO, // ex. « RCS Tours 123 456 789 », sinon « sans objet »
  vat: LEGAL_TODO, // n° de TVA intracommunautaire, ou « TVA non applicable, art. 293 B du CGI »
  publicationDirector: "Noria Bouha",

  // Boutique
  deliveryDelay: LEGAL_TODO, // ex. « 5 à 10 jours ouvrés après la commande »
  carrier: LEGAL_TODO, // ex. « La Poste (Colissimo) »
  returnAddress: LEGAL_TODO, // adresse de retour (souvent l'adresse du siège)

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

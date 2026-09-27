import type { SocialLink } from "@/lib/data/artists";

// Réseaux proposés dans le formulaire artiste, dans l'ordre d'affichage.
export const SOCIAL_FIELDS = [
  { field: "socialWebsite", label: "Site web" },
  { field: "socialInstagram", label: "Instagram" },
  { field: "socialFacebook", label: "Facebook" },
  { field: "socialYoutube", label: "YouTube" },
  { field: "socialSpotify", label: "Spotify" },
] as const satisfies readonly { field: string; label: SocialLink["label"] }[];

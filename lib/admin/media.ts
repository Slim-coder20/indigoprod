// Médias envoyés depuis l'admin vers le bucket Supabase Storage `media`
// (lecture publique, écriture uniquement via URL signée côté serveur).

export const MEDIA_BUCKET = "media";

export const MEDIA_KINDS = {
  image: {
    types: ["image/jpeg", "image/png", "image/webp"],
    maxBytes: 5 * 1024 * 1024,
    hint: "JPG, PNG ou WebP, 5 Mo maximum.",
  },
  video: {
    types: ["video/mp4"],
    maxBytes: 50 * 1024 * 1024,
    hint: "MP4, 50 Mo maximum.",
  },
} as const;

export type MediaKind = keyof typeof MEDIA_KINDS;

export const MEDIA_FOLDERS = ["artistes", "albums", "produits"] as const;
export type MediaFolder = (typeof MEDIA_FOLDERS)[number];

// Préfixe des URLs publiques du bucket.
export function mediaPublicPrefix(): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/`;
}

// Chemin d'un média accepté en base : fichier de /public ou du bucket.
export function isMediaPath(value: string): boolean {
  return (
    (value.startsWith("/") && !value.startsWith("//")) ||
    value.startsWith(mediaPublicPrefix())
  );
}

// Erreur de validation d'un fichier, ou null s'il est acceptable.
export function mediaFileError(
  kind: MediaKind,
  type: string,
  size: number,
): string | null {
  const rules = MEDIA_KINDS[kind];
  if (!(rules.types as readonly string[]).includes(type)) {
    return `Format non accepté. ${rules.hint}`;
  }
  if (size > rules.maxBytes) {
    return `Fichier trop lourd. ${rules.hint}`;
  }
  return null;
}

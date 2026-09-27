"use server";

import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/admin/auth";
import { slugify } from "@/lib/admin/slug";
import {
  MEDIA_BUCKET,
  MEDIA_FOLDERS,
  mediaFileError,
  mediaPublicPrefix,
  type MediaFolder,
  type MediaKind,
} from "@/lib/admin/media";
import { createAdminClient } from "@/lib/supabase/admin";

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "video/mp4": "mp4",
};

export type UploadTicket =
  | { ok: true; path: string; token: string; publicUrl: string }
  | { ok: false; error: string };

// Prépare l'envoi d'un fichier : le navigateur l'envoie ensuite directement
// à Supabase Storage avec ce jeton (pas de limite de taille des server
// actions ni de Vercel).
export async function createUploadTicket(
  folder: MediaFolder,
  kind: MediaKind,
  file: { name: string; type: string; size: number },
): Promise<UploadTicket> {
  await requireAdmin();

  if (!MEDIA_FOLDERS.includes(folder)) {
    return { ok: false, error: "Dossier inconnu." };
  }
  const error = mediaFileError(kind, file.type, file.size);
  if (error) return { ok: false, error };

  // ex. "artistes/da-silva-concert-3f9a2c1b.jpg"
  const base = slugify(file.name.replace(/\.[^.]+$/, "")).slice(0, 60);
  const path = `${folder}/${base || "fichier"}-${randomUUID().slice(0, 8)}.${EXTENSIONS[file.type]}`;

  const { data, error: storageError } = await createAdminClient()
    .storage.from(MEDIA_BUCKET)
    .createSignedUploadUrl(path);
  if (storageError || !data) {
    console.error("[admin] URL d'envoi Storage :", storageError);
    return { ok: false, error: "L'envoi est indisponible, réessayez." };
  }

  return {
    ok: true,
    path: data.path,
    token: data.token,
    publicUrl: `${mediaPublicPrefix()}${data.path}`,
  };
}

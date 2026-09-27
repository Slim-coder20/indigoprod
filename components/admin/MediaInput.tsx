"use client";

import { useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createUploadTicket } from "@/app/admin/(dashboard)/media/actions";
import {
  MEDIA_BUCKET,
  MEDIA_KINDS,
  mediaFileError,
  type MediaFolder,
  type MediaKind,
} from "@/lib/admin/media";

// Champ média : envoie le fichier choisi vers Supabase Storage et stocke son
// URL publique dans un champ caché `name`, enregistré avec le formulaire.
export default function MediaInput({
  name,
  kind,
  folder,
  defaultValue = "",
  error,
}: {
  name: string;
  kind: MediaKind;
  folder: MediaFolder;
  defaultValue?: string;
  error?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [status, setStatus] = useState<"idle" | "uploading">("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const rules = MEDIA_KINDS[kind];

  async function upload(file: File) {
    setUploadError(null);
    const invalid = mediaFileError(kind, file.type, file.size);
    if (invalid) return setUploadError(invalid);

    setStatus("uploading");
    try {
      const ticket = await createUploadTicket(folder, kind, {
        name: file.name,
        type: file.type,
        size: file.size,
      });
      if (!ticket.ok) return setUploadError(ticket.error);

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      );
      const { error: storageError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .uploadToSignedUrl(ticket.path, ticket.token, file, {
          contentType: file.type,
        });
      if (storageError) throw storageError;

      setUrl(ticket.publicUrl);
    } catch (err) {
      console.error("[admin] Envoi du fichier :", err);
      setUploadError("L'envoi a échoué, réessayez.");
    } finally {
      setStatus("idle");
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  const message = uploadError ?? error;

  return (
    <div className="mt-2 flex flex-col gap-3">
      <input type="hidden" name={name} value={url} />

      {url && (
        <div className="overflow-hidden rounded-lg border border-line bg-ink">
          {kind === "video" ? (
            <video src={url} controls preload="metadata" className="max-h-64 w-full" />
          ) : (
            // Aperçu simple : l'URL peut venir de /public ou de Storage
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="max-h-64 w-full object-contain" />
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label
          className={`cursor-pointer rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent ${
            status === "uploading" ? "pointer-events-none opacity-60" : ""
          }`}
        >
          {status === "uploading"
            ? "Envoi en cours…"
            : url
              ? "Remplacer le fichier"
              : "Choisir un fichier"}
          <input
            ref={fileInput}
            id={name}
            type="file"
            accept={rules.types.join(",")}
            className="sr-only"
            disabled={status === "uploading"}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) upload(file);
            }}
          />
        </label>
        {url && status === "idle" && (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="text-sm font-medium text-highlight hover:text-foreground"
          >
            Retirer
          </button>
        )}
      </div>

      {message ? (
        <p role="alert" className="text-sm text-highlight">
          {message}
        </p>
      ) : (
        <p className="text-sm text-subtle">{rules.hint}</p>
      )}
    </div>
  );
}

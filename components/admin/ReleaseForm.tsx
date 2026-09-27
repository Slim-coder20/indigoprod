"use client";

import Link from "next/link";
import { useActionState } from "react";
import type {
  ReleaseField,
  ReleaseFormState,
} from "@/app/admin/(dashboard)/boutique/sorties/actions";
import {
  Field,
  FormError,
  SubmitButton,
  errorProps,
  inputBorder,
  inputClass,
} from "@/components/admin/form";
import MediaInput from "@/components/admin/MediaInput";

export type ReleaseFormValues = Partial<Record<ReleaseField, string>>;

export default function ReleaseForm({
  action,
  artists,
  defaultValues = { type: "ALBUM" },
  submitLabel,
}: {
  action: (
    state: ReleaseFormState,
    formData: FormData,
  ) => Promise<ReleaseFormState>;
  artists: { id: string; name: string }[];
  defaultValues?: ReleaseFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, {});
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? defaultValues;

  const input = (field: ReleaseField) => ({
    id: field,
    name: field,
    defaultValue: values[field] ?? "",
    className: `${inputClass} ${inputBorder(errors[field])}`,
    ...errorProps(field, errors[field]),
  });

  return (
    <form
      key={JSON.stringify(values)}
      action={formAction}
      noValidate
      className="flex max-w-xl flex-col gap-5"
    >
      <Field label="Artiste" id="artistId" error={errors.artistId}>
        <select {...input("artistId")}>
          <option value="">— Choisir un artiste —</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Titre" id="title" error={errors.title}>
        <input type="text" placeholder="Chansons des Insomnies" {...input("title")} />
      </Field>

      <Field label="Type" id="type" error={errors.type}>
        <select {...input("type")}>
          <option value="ALBUM">Album</option>
          <option value="SINGLE">Single</option>
        </select>
      </Field>

      <Field
        label="Date de sortie"
        id="releaseDate"
        optional
        error={errors.releaseDate}
        hint="Laissez vide si elle n'est pas encore connue."
      >
        <input type="date" {...input("releaseDate")} />
      </Field>

      <Field label="Pochette" id="coverUrl" optional>
        <MediaInput
          name="coverUrl"
          kind="image"
          folder="albums"
          defaultValue={values.coverUrl}
          error={errors.coverUrl}
        />
      </Field>

      <Field
        label="Lien d'écoute"
        id="listenUrl"
        optional
        error={errors.listenUrl}
        hint="Spotify de préférence : un lecteur est affiché sur le site pour les singles sans produit en vente."
      >
        <input
          type="url"
          placeholder="https://open.spotify.com/album/…"
          {...input("listenUrl")}
        />
      </Field>

      <FormError message={state.message} />

      <div className="mt-2 flex items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/boutique"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}

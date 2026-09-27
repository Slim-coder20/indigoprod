"use client";

import Link from "next/link";
import { useActionState } from "react";
import type {
  ConcertField,
  ConcertFormState,
} from "@/app/admin/(dashboard)/concerts/actions";
import {
  Field,
  FormError,
  SubmitButton,
  errorProps,
  inputBorder,
  inputClass,
} from "@/components/admin/form";

export type ConcertFormValues = Partial<Record<ConcertField, string>>;

export default function ConcertForm({
  action,
  artists,
  defaultValues = {},
  submitLabel,
}: {
  action: (
    state: ConcertFormState,
    formData: FormData,
  ) => Promise<ConcertFormState>;
  artists: { id: string; name: string }[];
  defaultValues?: ConcertFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, {});
  const errors = state.fieldErrors ?? {};
  // Après une erreur, on réaffiche ce qui vient d'être saisi.
  const values = state.values ?? defaultValues;

  const input = (field: ConcertField) => ({
    id: field,
    name: field,
    defaultValue: values[field] ?? "",
    className: `${inputClass} ${inputBorder(errors[field])}`,
    ...errorProps(field, errors[field]),
  });

  return (
    // key : remonte les champs pour appliquer les valeurs renvoyées
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

      <Field label="Date" id="date" error={errors.date}>
        <input type="date" {...input("date")} />
      </Field>

      <Field label="Salle / lieu" id="venue" error={errors.venue}>
        <input type="text" placeholder="Le Temps Machine" {...input("venue")} />
      </Field>

      <Field label="Ville" id="city" error={errors.city}>
        <input type="text" placeholder="Tours" {...input("city")} />
      </Field>

      <Field
        label="Nom de l'événement"
        id="title"
        optional
        error={errors.title}
        hint="Ex. un festival. Laissez vide pour un concert simple."
      >
        <input
          type="text"
          placeholder="Festival Jazz à la Cité"
          {...input("title")}
        />
      </Field>

      <Field
        label="Lien billetterie"
        id="ticketUrl"
        optional
        error={errors.ticketUrl}
      >
        <input type="url" placeholder="https://…" {...input("ticketUrl")} />
      </Field>

      <FormError message={state.message} />

      <div className="mt-2 flex items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/concerts"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}

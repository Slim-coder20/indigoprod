"use client";

import Link from "next/link";
import { useActionState } from "react";
import type {
  ArtistField,
  ArtistFormState,
} from "@/app/admin/(dashboard)/artistes/actions";
import {
  Field,
  FormError,
  SubmitButton,
  errorProps,
  inputBorder,
  inputClass,
} from "@/components/admin/form";
import MediaInput from "@/components/admin/MediaInput";
import { SOCIAL_FIELDS } from "@/lib/admin/socials";

export type ArtistFormValues = Partial<Record<ArtistField, string>>;

// Cadrages proposés pour la photo (CSS object-position).
const PHOTO_POSITIONS = [
  { value: "", label: "Centré" },
  { value: "center 5%", label: "Tout en haut" },
  { value: "center 25%", label: "Haut" },
  { value: "center 75%", label: "Bas" },
];

export default function ArtistForm({
  action,
  defaultValues = {},
  submitLabel,
  isNew,
}: {
  action: (
    state: ArtistFormState,
    formData: FormData,
  ) => Promise<ArtistFormState>;
  defaultValues?: ArtistFormValues;
  submitLabel: string;
  isNew?: boolean;
}) {
  const [state, formAction] = useActionState(action, {});
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? defaultValues;

  const input = (field: ArtistField) => ({
    id: field,
    name: field,
    defaultValue: values[field] ?? "",
    className: `${inputClass} ${inputBorder(errors[field])}`,
    ...errorProps(field, errors[field]),
  });

  // Un cadrage saisi hors de la liste reste sélectionnable.
  const positions = PHOTO_POSITIONS.some(
    (position) => position.value === (values.photoPosition ?? ""),
  )
    ? PHOTO_POSITIONS
    : [
        ...PHOTO_POSITIONS,
        { value: values.photoPosition!, label: values.photoPosition! },
      ];

  return (
    <form
      key={JSON.stringify(values)}
      action={formAction}
      noValidate
      className="flex max-w-2xl flex-col gap-10"
    >
      <Section title="Identité">
        <Field label="Nom" id="name" error={errors.name}>
          <input type="text" placeholder="Da Silva" {...input("name")} />
        </Field>
        <Field
          label="Adresse de la page"
          id="slug"
          optional={isNew}
          error={errors.slug}
          hint={
            isNew
              ? "Laissez vide pour la créer à partir du nom (ex. /artistes/da-silva)."
              : "Attention : la modifier change le lien de la page de l'artiste."
          }
        >
          <div className="flex items-center gap-1">
            <span className="mt-2 shrink-0 text-sm text-subtle">
              /artistes/
            </span>
            <input type="text" placeholder="da-silva" {...input("slug")} />
          </div>
        </Field>
        <Field label="Rôle" id="role" optional error={errors.role}>
          <input
            type="text"
            placeholder="Chanteur, interprète et compositeur"
            {...input("role")}
          />
        </Field>
        <Field label="Genre musical" id="genre" error={errors.genre}>
          <input
            type="text"
            placeholder="Chanson française"
            {...input("genre")}
          />
        </Field>
      </Section>

      <Section title="Textes">
        <Field
          label="Résumé"
          id="bio"
          error={errors.bio}
          hint="Affiché sur la carte de l'artiste (les 3 premières lignes)."
        >
          <textarea rows={4} {...input("bio")} />
        </Field>
        <Field
          label="Biographie"
          id="biography"
          optional
          error={errors.biography}
          hint="Affichée sur la page de l'artiste. Séparez les paragraphes par une ligne vide. Vide : le résumé est affiché à la place."
        >
          <textarea rows={12} {...input("biography")} />
        </Field>
      </Section>

      <Section title="Photo">
        <Field label="Photo" id="photoUrl" optional>
          <MediaInput
            name="photoUrl"
            kind="image"
            folder="artistes"
            defaultValue={values.photoUrl}
            error={errors.photoUrl}
          />
        </Field>
        <Field
          label="Cadrage"
          id="photoPosition"
          error={errors.photoPosition}
          hint="Partie de la photo gardée visible quand elle est recadrée."
        >
          <select {...input("photoPosition")}>
            {positions.map((position) => (
              <option key={position.value} value={position.value}>
                {position.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Crédit photo"
          id="photoCredit"
          optional
          error={errors.photoCredit}
        >
          <input
            type="text"
            placeholder="Nom du photographe"
            {...input("photoCredit")}
          />
        </Field>
      </Section>

      <Section
        title="Vidéo"
        description="Facultative. Si elle est renseignée, elle remplace la photo sur la page de l'artiste."
      >
        <Field label="Vidéo" id="videoUrl" optional>
          <MediaInput
            name="videoUrl"
            kind="video"
            folder="artistes"
            defaultValue={values.videoUrl}
            error={errors.videoUrl}
          />
        </Field>
        <Field
          label="Image d'aperçu"
          id="videoPosterUrl"
          optional
          hint="Affichée avant la lecture."
        >
          <MediaInput
            name="videoPosterUrl"
            kind="image"
            folder="artistes"
            defaultValue={values.videoPosterUrl}
            error={errors.videoPosterUrl}
          />
        </Field>
        <Field label="Titre de la vidéo" id="videoTitle" error={errors.videoTitle}>
          <input
            type="text"
            placeholder="Father — solo de basse"
            {...input("videoTitle")}
          />
        </Field>
      </Section>

      <Section
        title="Réseaux sociaux"
        description="Liens complets (https://…). Les champs vides ne sont pas affichés."
      >
        {SOCIAL_FIELDS.map((social) => (
          <Field
            key={social.field}
            label={social.label}
            id={social.field}
            optional
            error={errors[social.field]}
          >
            <input
              type="url"
              placeholder="https://…"
              {...input(social.field)}
            />
          </Field>
        ))}
      </Section>

      <FormError message={state.message} />

      <div className="flex items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/artistes"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="text-lg font-semibold text-foreground">{title}</legend>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </fieldset>
  );
}

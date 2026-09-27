import "server-only";
import { z } from "zod";

// État renvoyé par les server actions des formulaires admin.
export type FormState<Field extends string = string> = {
  message?: string;
  fieldErrors?: Partial<Record<Field, string>>;
  // Valeurs saisies, renvoyées pour ne pas vider le formulaire en cas d'erreur
  values?: Partial<Record<Field, string>>;
};

// Champs texte d'un FormData, tels que saisis (pour les réafficher).
export function formValues<Field extends string>(
  formData: FormData,
  fields: readonly Field[],
): Record<Field, string> {
  return Object.fromEntries(
    fields.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as Record<Field, string>;
}

// Première erreur Zod de chaque champ.
export function fieldErrorsOf<Field extends string>(
  error: z.ZodError,
): Partial<Record<Field, string>> {
  const { fieldErrors } = z.flattenError(error);
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [
      field,
      (messages as string[] | undefined)?.[0],
    ]),
  ) as Partial<Record<Field, string>>;
}

// Texte obligatoire, espaces retirés.
export const requiredText = (message: string, max = 200) =>
  z
    .string()
    .trim()
    .min(1, message)
    .max(max, `${max} caractères maximum.`);

// Texte facultatif : une chaîne vide devient null.
export const optionalText = (max = 200) =>
  z
    .string()
    .trim()
    .max(max, `${max} caractères maximum.`)
    .transform((value) => value || null);

// Lien http(s) facultatif : une chaîne vide devient null.
export const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^https?:\/\/\S+\.\S+/.test(value),
    "Indiquez un lien complet, commençant par https://",
  )
  .transform((value) => value || null);

// Date AAAA-MM-JJ (champ <input type="date">), convertie en Date UTC.
export const isoDate = (message: string) =>
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, message)
    .transform((value) => new Date(`${value}T00:00:00Z`))
    .refine((date) => !Number.isNaN(date.getTime()), message);

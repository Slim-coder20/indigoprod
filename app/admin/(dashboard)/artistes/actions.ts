"use server";

import { z } from "zod";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";
import { requireAdmin } from "@/lib/admin/auth";
import {
  fieldErrorsOf,
  formValues,
  optionalText,
  optionalUrl,
  requiredText,
  type FormState,
} from "@/lib/admin/forms";
import { isMediaPath } from "@/lib/admin/media";
import { slugify, uniqueSlug } from "@/lib/admin/slug";
import { SOCIAL_FIELDS } from "@/lib/admin/socials";
import type { SocialLink } from "@/lib/data/artists";

const FIELDS = [
  "name",
  "slug",
  "role",
  "genre",
  "bio",
  "biography",
  "photoUrl",
  "photoPosition",
  "photoCredit",
  "videoUrl",
  "videoPosterUrl",
  "videoTitle",
  ...SOCIAL_FIELDS.map((social) => social.field),
] as const;

export type ArtistField = (typeof FIELDS)[number];
export type ArtistFormState = FormState<ArtistField>;

// Chemin de média facultatif (fichier de /public ou du bucket Storage).
const optionalMedia = z
  .string()
  .trim()
  .refine((value) => value === "" || isMediaPath(value), "Média invalide.")
  .transform((value) => value || null);

const artistSchema = z
  .object({
    name: requiredText("Indiquez le nom de l'artiste.", 100),
    slug: z
      .string()
      .trim()
      .transform(slugify)
      .pipe(z.string().max(80, "80 caractères maximum.")),
    role: optionalText(100),
    genre: requiredText("Indiquez le genre musical.", 100),
    bio: requiredText("Écrivez un court résumé.", 2000),
    // Un paragraphe par bloc séparé d'une ligne vide
    biography: z
      .string()
      .max(20000, "Biographie trop longue.")
      .transform((text) =>
        text
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
      ),
    photoUrl: optionalMedia,
    photoPosition: z
      .string()
      .regex(/^(|center( \d{1,3}%)?)$/, "Cadrage invalide.")
      .transform((value) => value || null),
    photoCredit: optionalText(100),
    videoUrl: optionalMedia,
    videoPosterUrl: optionalMedia,
    videoTitle: optionalText(150),
    ...Object.fromEntries(
      SOCIAL_FIELDS.map((social) => [social.field, optionalUrl]),
    ),
  })
  .refine((artist) => !artist.videoUrl || artist.videoTitle, {
    path: ["videoTitle"],
    message: "Donnez un titre à la vidéo.",
  });

type ArtistData = Omit<Prisma.ArtistCreateInput, "slug">;

type ParsedArtist =
  | { ok: true; slug: string; data: ArtistData }
  | { ok: false; state: ArtistFormState };

function parseArtist(formData: FormData): ParsedArtist {
  const values = formValues(formData, FIELDS);
  const result = artistSchema.safeParse(values);
  if (!result.success) {
    return {
      ok: false,
      state: { fieldErrors: fieldErrorsOf(result.error), values },
    };
  }

  const artist = result.data as z.infer<typeof artistSchema> &
    Record<string, string | null>;
  const socials: SocialLink[] = SOCIAL_FIELDS.flatMap((social) =>
    artist[social.field] ? [{ label: social.label, url: artist[social.field]! }] : [],
  );

  return {
    ok: true,
    slug: artist.slug,
    data: {
      name: artist.name,
      role: artist.role,
      genre: artist.genre,
      bio: artist.bio,
      biography: artist.biography,
      photoUrl: artist.photoUrl,
      photoPosition: artist.photoPosition,
      photoCredit: artist.photoCredit,
      videoUrl: artist.videoUrl,
      videoPosterUrl: artist.videoUrl ? artist.videoPosterUrl : null,
      videoTitle: artist.videoUrl ? artist.videoTitle : null,
      socials: socials.length > 0 ? socials : Prisma.DbNull,
    },
  };
}

async function slugTaken(slug: string, exceptId?: string) {
  const artist = await prisma.artist.findUnique({
    where: { slug },
    select: { id: true },
  });
  return Boolean(artist && artist.id !== exceptId);
}

// Le nom d'un artiste apparaît aussi dans les concerts et les sorties.
function refreshArtistPages() {
  updateTag("artists");
  updateTag("concerts");
  updateTag("releases");
}

export async function createArtist(
  _prevState: ArtistFormState,
  formData: FormData,
): Promise<ArtistFormState> {
  await requireAdmin();
  const parsed = parseArtist(formData);
  if (!parsed.ok) return parsed.state;

  let slug = parsed.slug;
  if (slug) {
    if (await slugTaken(slug)) {
      return {
        fieldErrors: { slug: "Cette adresse est déjà utilisée." },
        values: formValues(formData, FIELDS),
      };
    }
  } else {
    slug = await uniqueSlug(slugify(parsed.data.name), (candidate) =>
      slugTaken(candidate),
    );
  }

  await prisma.artist.create({ data: { ...parsed.data, slug } });
  refreshArtistPages();
  redirect("/admin/artistes?ok=created");
}

export async function updateArtist(
  id: string,
  _prevState: ArtistFormState,
  formData: FormData,
): Promise<ArtistFormState> {
  await requireAdmin();
  const parsed = parseArtist(formData);
  if (!parsed.ok) return parsed.state;

  const values = formValues(formData, FIELDS);
  if (!parsed.slug) {
    return { fieldErrors: { slug: "Indiquez l'adresse de la page." }, values };
  }
  if (await slugTaken(parsed.slug, id)) {
    return {
      fieldErrors: { slug: "Cette adresse est déjà utilisée." },
      values,
    };
  }

  const { count } = await prisma.artist.updateMany({
    where: { id },
    data: { ...parsed.data, slug: parsed.slug },
  });
  if (count === 0) return { message: "Cet artiste n'existe plus.", values };

  refreshArtistPages();
  redirect("/admin/artistes?ok=updated");
}

export async function deleteArtist(id: string) {
  await requireAdmin();

  // Supprimer un artiste supprimerait en cascade ses sorties et concerts :
  // on l'interdit tant qu'il en a.
  const artist = await prisma.artist.findUnique({
    where: { id },
    select: { _count: { select: { albums: true, concerts: true } } },
  });
  if (!artist) redirect("/admin/artistes");
  if (artist._count.albums > 0 || artist._count.concerts > 0) {
    redirect(`/admin/artistes/${id}`);
  }

  await prisma.artist.delete({ where: { id } });
  refreshArtistPages();
  redirect("/admin/artistes?ok=deleted");
}

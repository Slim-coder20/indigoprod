"use server";

import { z } from "zod";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import {
  fieldErrorsOf,
  formValues,
  isoDate,
  optionalText,
  optionalUrl,
  requiredText,
  type FormState,
} from "@/lib/admin/forms";
import { slugify, uniqueSlug } from "@/lib/admin/slug";

const FIELDS = [
  "artistId",
  "title",
  "venue",
  "city",
  "date",
  "ticketUrl",
] as const;

export type ConcertField = (typeof FIELDS)[number];
export type ConcertFormState = FormState<ConcertField>;

const concertSchema = z.object({
  artistId: z.string().min(1, "Choisissez un artiste."),
  title: optionalText(),
  venue: requiredText("Indiquez la salle ou le lieu."),
  city: requiredText("Indiquez la ville.", 100),
  date: isoDate("Indiquez la date du concert."),
  ticketUrl: optionalUrl,
});

type ParsedConcert =
  | { ok: true; data: z.infer<typeof concertSchema>; artistSlug: string }
  | { ok: false; state: ConcertFormState };

async function parseConcert(formData: FormData): Promise<ParsedConcert> {
  const values = formValues(formData, FIELDS);
  const result = concertSchema.safeParse(values);
  if (!result.success) {
    return {
      ok: false,
      state: { fieldErrors: fieldErrorsOf(result.error), values },
    };
  }
  const artist = await prisma.artist.findUnique({
    where: { id: result.data.artistId },
    select: { slug: true },
  });
  if (!artist) {
    return {
      ok: false,
      state: {
        fieldErrors: { artistId: "Cet artiste n'existe plus." },
        values,
      },
    };
  }
  return { ok: true, data: result.data, artistSlug: artist.slug };
}

export async function createConcert(
  _prevState: ConcertFormState,
  formData: FormData,
): Promise<ConcertFormState> {
  await requireAdmin();
  const parsed = await parseConcert(formData);
  if (!parsed.ok) return parsed.state;

  // Identifiant interne stable, ex. "da-silva-2026-11-14-tours"
  const base = slugify(
    `${parsed.artistSlug}-${parsed.data.date.toISOString().slice(0, 10)}-${parsed.data.city}`,
  );
  const slug = await uniqueSlug(base, async (candidate) =>
    Boolean(await prisma.concert.findUnique({ where: { slug: candidate } })),
  );

  await prisma.concert.create({ data: { ...parsed.data, slug } });
  updateTag("concerts");
  redirect("/admin/concerts?ok=created");
}

export async function updateConcert(
  id: string,
  _prevState: ConcertFormState,
  formData: FormData,
): Promise<ConcertFormState> {
  await requireAdmin();
  const parsed = await parseConcert(formData);
  if (!parsed.ok) return parsed.state;

  const { count } = await prisma.concert.updateMany({
    where: { id },
    data: parsed.data,
  });
  if (count === 0) return { message: "Ce concert n'existe plus." };

  updateTag("concerts");
  redirect("/admin/concerts?ok=updated");
}

export async function deleteConcert(id: string) {
  await requireAdmin();
  await prisma.concert.deleteMany({ where: { id } });
  updateTag("concerts");
  redirect("/admin/concerts?ok=deleted");
}

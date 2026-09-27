// "Festival Jazz à la Cité" → "festival-jazz-a-la-cite"
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Premier slug libre parmi base, base-2, base-3…
export async function uniqueSlug(
  base: string,
  isTaken: (slug: string) => Promise<boolean>,
): Promise<string> {
  let slug = base;
  for (let n = 2; await isTaken(slug); n++) slug = `${base}-${n}`;
  return slug;
}

import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AdminUser = { id: string; email: string };

// ADMIN_EMAIL : un ou plusieurs emails autorisés, séparés par des virgules.
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}

// Utilisateur admin de la requête en cours, ou null. Mis en cache le temps
// d'un rendu pour ne vérifier la session qu'une fois par requête.
export const getAdminUser = cache(async (): Promise<AdminUser | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims.email;
  if (!data || !isAdminEmail(email)) return null;
  return { id: data.claims.sub, email: email! };
});

// À appeler en tête de chaque page et de chaque server action de l'admin.
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}

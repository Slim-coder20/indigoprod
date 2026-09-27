"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin/auth";

export type LoginState = {
  error?: string;
  email?: string; // renvoyé pour ne pas vider le champ en cas d'erreur
};

const INVALID_CREDENTIALS = "Email ou mot de passe incorrect.";

// N'accepte qu'une redirection interne vers l'admin (pas de lien externe).
function safeNext(next: FormDataEntryValue | null): string {
  const path = typeof next === "string" ? next : "";
  return path.startsWith("/admin") && !path.startsWith("/admin/login")
    ? path
    : "/admin";
}

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Indiquez votre email et votre mot de passe.", email };
  }
  // Même message qu'un mauvais mot de passe : on ne révèle pas quels
  // emails sont autorisés.
  if (!isAdminEmail(email)) {
    return { error: INVALID_CREDENTIALS, email };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { error: INVALID_CREDENTIALS, email };
  }

  redirect(safeNext(formData.get("next")));
}

export async function logout() {
  const supabase = await createClient();
  // "local" : ne ferme que la session de cet appareil (par défaut, Supabase
  // déconnecte le compte partout).
  await supabase.auth.signOut({ scope: "local" });
  redirect("/admin/login");
}

import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Client Supabase lié aux cookies de la requête en cours (session admin).
// À recréer à chaque requête : ne jamais le partager entre utilisateurs.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Appelé depuis un Server Component, où les cookies sont en
            // lecture seule : proxy.ts se charge déjà de rafraîchir la session.
          }
        },
      },
    },
  );
}

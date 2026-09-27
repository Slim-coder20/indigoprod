import "server-only";
import { createClient } from "@supabase/supabase-js";

// Client Supabase avec la clé secrète : contourne la RLS. Réservé au
// serveur, et uniquement après requireAdmin().
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

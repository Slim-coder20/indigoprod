import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Utilisée par les migrations et le seed (connexion directe Supabase).
    // Facultative : `prisma generate` (au build, ex. sur Vercel) n'en a pas
    // besoin, et migrate échoue avec un message explicite si elle manque.
    url: process.env.DIRECT_URL,
  },
});

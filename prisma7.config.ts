import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Le CLI (migrations) passe par le pooler Supabase en mode Session.
    url: env("DIRECT_URL"),
  },
});

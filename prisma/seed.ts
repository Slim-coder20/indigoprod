// Remplit la base avec les données statiques de lib/data/.
// Lancement : npm run db:seed (idempotent : relançable sans créer de doublons).
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { ARTISTS } from "../lib/data/artists";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DIRECT_URL }),
});

async function seedArtists() {
  for (const artist of ARTISTS) {
    const data = {
      name: artist.name,
      role: artist.role ?? null,
      genre: artist.genre,
      bio: artist.bio,
      biography: artist.biography ?? [],
      photoUrl: artist.photo ?? null,
      photoPosition: artist.photoPosition ?? null,
      photoCredit: artist.photoCredit ?? null,
      videoUrl: artist.video?.src ?? null,
      videoPosterUrl: artist.video?.poster ?? null,
      videoTitle: artist.video?.title ?? null,
      socials: artist.socials ?? [],
    };
    await prisma.artist.upsert({
      where: { slug: artist.id },
      create: { slug: artist.id, ...data },
      update: data,
    });
    console.log(`  ✓ ${artist.name}`);
  }
}

async function main() {
  console.log("Artistes :");
  await seedArtists();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

// Remplit la base avec les données statiques de lib/data/.
// Lancement : npm run db:seed (idempotent : relançable sans créer de doublons).
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { ARTISTS } from "../lib/data/artists";
import { RELEASES } from "../lib/data/albums";
import { CONCERTS } from "../lib/data/concerts";

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

async function seedReleases() {
  for (const release of RELEASES) {
    const artist = await prisma.artist.findUniqueOrThrow({
      where: { slug: release.artistSlug },
    });
    const data = {
      title: release.title,
      type: release.type,
      releaseDate: release.releaseDate ? new Date(release.releaseDate) : null,
      coverUrl: release.coverUrl,
      listenUrl: release.listenUrl ?? null,
      artistId: artist.id,
    };
    const album = await prisma.album.upsert({
      where: { slug: release.slug },
      create: { slug: release.slug, ...data },
      update: data,
    });

    for (const product of release.products ?? []) {
      const productData = {
        name: product.name,
        description: product.description ?? null,
        type: "ALBUM" as const,
        priceCents: product.priceCents,
        stock: product.stock,
        imageUrl: product.imageUrl ?? release.coverUrl,
        albumId: album.id,
      };
      // Le stock restant n'est initialisé qu'à la création, pour ne pas
      // écraser les ventes déjà enregistrées.
      await prisma.product.upsert({
        where: { slug: product.slug },
        create: {
          slug: product.slug,
          ...productData,
          stockRestant: product.stock,
        },
        update: productData,
      });
    }
    const count = release.products?.length ?? 0;
    console.log(
      `  ✓ ${release.title} (${release.type.toLowerCase()}${count ? `, ${count} produit(s)` : ""})`,
    );
  }
}

async function seedConcerts() {
  for (const concert of CONCERTS) {
    const artist = await prisma.artist.findUniqueOrThrow({
      where: { slug: concert.artistSlug },
    });
    const data = {
      title: concert.title ?? null,
      venue: concert.venue,
      city: concert.city,
      date: new Date(concert.date),
      ticketUrl: concert.ticketUrl ?? null,
      artistId: artist.id,
    };
    await prisma.concert.upsert({
      where: { slug: concert.slug },
      create: { slug: concert.slug, ...data },
      update: data,
    });
    console.log(`  ✓ ${concert.date} ${artist.name} — ${concert.venue}`);
  }
}

async function main() {
  console.log("Artistes :");
  await seedArtists();
  console.log("Sorties :");
  await seedReleases();
  console.log("Concerts :");
  await seedConcerts();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

import "server-only";
import { prisma } from "@/lib/prisma";

// Sorties proposées dans le formulaire produit : « Artiste — Titre ».
export async function getReleaseOptions() {
  const releases = await prisma.album.findMany({
    orderBy: [{ artist: { name: "asc" } }, { title: "asc" }],
    select: { id: true, title: true, artist: { select: { name: true } } },
  });
  return releases.map((release) => ({
    id: release.id,
    label: `${release.artist.name} — ${release.title}`,
  }));
}

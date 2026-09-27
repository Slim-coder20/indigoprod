import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import FlashMessage from "@/components/admin/FlashMessage";

const FLASH = {
  created: "Artiste ajouté.",
  updated: "Artiste modifié.",
  deleted: "Artiste supprimé.",
};

export default async function AdminArtistsPage({
  searchParams,
}: PageProps<"/admin/artistes">) {
  await requireAdmin();
  const { ok } = await searchParams;

  const artists = await prisma.artist.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      genre: true,
      photoUrl: true,
      _count: { select: { albums: true, concerts: true } },
    },
  });

  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Artistes</h1>
        <Link
          href="/admin/artistes/nouveau"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
        >
          + Ajouter un artiste
        </Link>
      </div>

      <FlashMessage message={FLASH[ok as keyof typeof FLASH]} />

      {artists.length === 0 ? (
        <p className="text-sm text-muted">Aucun artiste pour l&apos;instant.</p>
      ) : (
        <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
          {artists.map((artist) => (
            <li key={artist.id}>
              <Link
                href={`/admin/artistes/${artist.id}`}
                className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-surface-strong"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ink">
                  {artist.photoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={artist.photoUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{artist.name}</p>
                  <p className="truncate text-sm text-muted">
                    {artist.genre} · /artistes/{artist.slug}
                  </p>
                </div>
                <p className="hidden shrink-0 text-sm text-subtle sm:block">
                  {artist._count.albums} sortie(s) · {artist._count.concerts}{" "}
                  concert(s)
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

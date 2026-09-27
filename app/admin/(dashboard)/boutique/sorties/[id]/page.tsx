import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import ReleaseForm from "@/components/admin/ReleaseForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteRelease, updateRelease } from "../actions";

export default async function EditReleasePage({
  params,
}: PageProps<"/admin/boutique/sorties/[id]">) {
  await requireAdmin();
  const { id } = await params;

  const [release, artists] = await Promise.all([
    prisma.album.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    }),
    prisma.artist.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);
  if (!release) notFound();
  const products = release._count.products;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">
        {release.title}
      </h1>
      <ReleaseForm
        action={updateRelease.bind(null, release.id)}
        artists={artists}
        submitLabel="Enregistrer"
        defaultValues={{
          artistId: release.artistId,
          title: release.title,
          type: release.type,
          releaseDate: release.releaseDate?.toISOString().slice(0, 10) ?? "",
          coverUrl: release.coverUrl ?? "",
          listenUrl: release.listenUrl ?? "",
        }}
      />

      <section className="max-w-xl border-t border-line pt-6">
        <h2 className="text-sm font-semibold text-foreground">
          Zone de danger
        </h2>
        {products > 0 ? (
          <p className="mt-1 text-sm text-muted">
            Cette sortie ne peut pas être supprimée : elle a encore {products}{" "}
            produit(s). Supprimez-les ou rattachez-les à une autre sortie
            d&apos;abord.
          </p>
        ) : (
          <>
            <p className="mt-1 mb-4 text-sm text-muted">
              La suppression est définitive : la sortie disparaît du site.
            </p>
            <DeleteButton
              action={deleteRelease.bind(null, release.id)}
              confirmMessage={`Supprimer définitivement « ${release.title} » ?`}
              label="Supprimer la sortie"
            />
          </>
        )}
      </section>
    </div>
  );
}

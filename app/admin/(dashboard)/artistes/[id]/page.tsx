import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import { SOCIAL_FIELDS } from "@/lib/admin/socials";
import ArtistForm from "@/components/admin/ArtistForm";
import DeleteButton from "@/components/admin/DeleteButton";
import type { SocialLink } from "@/lib/data/artists";
import { deleteArtist, updateArtist } from "../actions";

export default async function EditArtistPage({
  params,
}: PageProps<"/admin/artistes/[id]">) {
  await requireAdmin();
  const { id } = await params;

  const artist = await prisma.artist.findUnique({
    where: { id },
    include: { _count: { select: { albums: true, concerts: true } } },
  });
  if (!artist) notFound();

  const socials = (artist.socials as SocialLink[] | null) ?? [];
  const socialValues = Object.fromEntries(
    SOCIAL_FIELDS.map((social) => [
      social.field,
      socials.find((link) => link.label === social.label)?.url ?? "",
    ]),
  );
  const { albums, concerts } = artist._count;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">
          {artist.name}
        </h1>
        <Link
          href={`/artistes/${artist.slug}`}
          target="_blank"
          className="text-sm font-medium text-highlight hover:text-foreground"
        >
          Voir la page publique ↗
        </Link>
      </div>

      <ArtistForm
        action={updateArtist.bind(null, artist.id)}
        submitLabel="Enregistrer"
        defaultValues={{
          name: artist.name,
          slug: artist.slug,
          role: artist.role ?? "",
          genre: artist.genre,
          bio: artist.bio,
          biography: artist.biography.join("\n\n"),
          photoUrl: artist.photoUrl ?? "",
          photoPosition: artist.photoPosition ?? "",
          photoCredit: artist.photoCredit ?? "",
          videoUrl: artist.videoUrl ?? "",
          videoPosterUrl: artist.videoPosterUrl ?? "",
          videoTitle: artist.videoTitle ?? "",
          ...socialValues,
        }}
      />

      <section className="max-w-2xl border-t border-line pt-6">
        <h2 className="text-sm font-semibold text-foreground">
          Zone de danger
        </h2>
        {albums > 0 || concerts > 0 ? (
          <p className="mt-1 text-sm text-muted">
            Cet artiste ne peut pas être supprimé : il a encore {albums}{" "}
            sortie(s) et {concerts} concert(s). Supprimez-les d&apos;abord.
          </p>
        ) : (
          <>
            <p className="mt-1 mb-4 text-sm text-muted">
              La suppression est définitive : l&apos;artiste et sa page
              disparaissent du site.
            </p>
            <DeleteButton
              action={deleteArtist.bind(null, artist.id)}
              confirmMessage={`Supprimer définitivement ${artist.name} ?`}
              label="Supprimer l'artiste"
            />
          </>
        )}
      </section>
    </div>
  );
}

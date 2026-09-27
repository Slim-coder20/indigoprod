import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import ConcertForm from "@/components/admin/ConcertForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteConcert, updateConcert } from "../actions";

export default async function EditConcertPage({
  params,
}: PageProps<"/admin/concerts/[id]">) {
  await requireAdmin();
  const { id } = await params;

  const [concert, artists] = await Promise.all([
    prisma.concert.findUnique({ where: { id } }),
    prisma.artist.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);
  if (!concert) notFound();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">
        Modifier le concert
      </h1>
      <ConcertForm
        action={updateConcert.bind(null, concert.id)}
        artists={artists}
        submitLabel="Enregistrer"
        defaultValues={{
          artistId: concert.artistId,
          title: concert.title ?? "",
          venue: concert.venue,
          city: concert.city,
          date: concert.date.toISOString().slice(0, 10),
          ticketUrl: concert.ticketUrl ?? "",
        }}
      />

      <section className="max-w-xl border-t border-line pt-6">
        <h2 className="text-sm font-semibold text-foreground">Zone de danger</h2>
        <p className="mt-1 mb-4 text-sm text-muted">
          La suppression est définitive : le concert disparaît du site.
        </p>
        <DeleteButton
          action={deleteConcert.bind(null, concert.id)}
          confirmMessage="Supprimer définitivement ce concert ?"
          label="Supprimer le concert"
        />
      </section>
    </div>
  );
}

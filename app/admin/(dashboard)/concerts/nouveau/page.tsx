import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import ConcertForm from "@/components/admin/ConcertForm";
import { createConcert } from "../actions";

export default async function NewConcertPage() {
  await requireAdmin();
  const artists = await prisma.artist.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">
        Ajouter un concert
      </h1>
      <ConcertForm
        action={createConcert}
        artists={artists}
        submitLabel="Ajouter le concert"
      />
    </div>
  );
}

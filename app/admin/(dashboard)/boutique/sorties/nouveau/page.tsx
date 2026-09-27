import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import ReleaseForm from "@/components/admin/ReleaseForm";
import { createRelease } from "../actions";

export default async function NewReleasePage() {
  await requireAdmin();
  const artists = await prisma.artist.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">
        Ajouter une sortie
      </h1>
      <ReleaseForm
        action={createRelease}
        artists={artists}
        submitLabel="Ajouter la sortie"
      />
    </div>
  );
}

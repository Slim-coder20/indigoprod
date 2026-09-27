import { requireAdmin } from "@/lib/admin/auth";
import ArtistForm from "@/components/admin/ArtistForm";
import { createArtist } from "../actions";

export default async function NewArtistPage() {
  await requireAdmin();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">
        Ajouter un artiste
      </h1>
      <ArtistForm
        action={createArtist}
        submitLabel="Ajouter l'artiste"
        isNew
      />
    </div>
  );
}

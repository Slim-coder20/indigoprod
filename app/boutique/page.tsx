import Container from "@/components/Container";
import { ALBUMS } from "@/lib/data/albums";

export default function Boutique() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
        Boutique
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50">
        Albums de nos artistes
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        Le paiement en ligne (Stripe) sera activé prochainement — voir
        CLAUDE.md pour la feuille de route.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ALBUMS.map((album) => {
          const epuise = album.stockRestant <= 0;
          return (
            <div
              key={album.id}
              className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-indigo-500/30 to-zinc-800" />
              <p className="mt-4 text-lg font-semibold text-zinc-50">
                {album.albumTitle}
              </p>
              <p className="text-sm text-zinc-400">{album.artistName}</p>
              <p className="mt-1 text-xs text-zinc-500">
                Sorti le{" "}
                {new Date(album.releaseDate).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-indigo-400">
                  {album.price.toFixed(2)} €
                </p>
                <p
                  className={`text-xs font-medium ${
                    epuise ? "text-red-400" : "text-zinc-500"
                  }`}
                >
                  {epuise
                    ? "Épuisé"
                    : `${album.stockRestant} en stock`}
                </p>
              </div>

              <button
                type="button"
                disabled={epuise}
                className="mt-4 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                {epuise ? "Indisponible" : "Ajouter au panier"}
              </button>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

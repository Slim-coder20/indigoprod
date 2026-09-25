import Container from "@/components/Container";
import AlbumCover from "@/components/AlbumCover";
import { ALBUMS } from "@/lib/data/albums";

export default function Boutique() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-highlight">
        Boutique
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
        Albums de nos artistes
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Le paiement en ligne (Stripe) sera activé prochainement — voir
        CLAUDE.md pour la feuille de route.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ALBUMS.map((album, index) => {
          const epuise = album.stockRestant <= 0;
          return (
            <div
              key={album.id}
              className="flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
            >
              <AlbumCover index={index} />
              <p className="mt-4 text-lg font-semibold text-foreground">
                {album.albumTitle}
              </p>
              <p className="text-sm text-muted">{album.artistName}</p>
              <p className="mt-1 text-xs text-subtle">
                Sorti le{" "}
                {new Date(album.releaseDate).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-accent">
                  {album.price.toFixed(2)} €
                </p>
                <p
                  className={`text-xs font-medium ${
                    epuise
                      ? "rounded-full border border-highlight px-2.5 py-0.5 text-highlight"
                      : "text-subtle"
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
                className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:border disabled:border-line-strong disabled:bg-transparent disabled:text-subtle"
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

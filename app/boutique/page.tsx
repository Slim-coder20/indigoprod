import Container from "@/components/Container";
import ReleaseCover from "@/components/ReleaseCover";
import {
  formatPrice,
  formatReleaseDate,
  getReleases,
  spotifyEmbedUrl,
} from "@/lib/queries/releases";

export default async function Boutique() {
  const releases = await getReleases();
  // Une carte par édition vendue (un album peut en avoir plusieurs).
  const forSale = releases.flatMap((release) =>
    release.products.map((product) => ({ release, product })),
  );
  const freeListening = releases.filter(
    (release) => release.products.length === 0 && release.listenUrl,
  );

  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-highlight">
        Boutique
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
        Albums de nos artistes
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Le paiement en ligne sera bientôt disponible.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {forSale.map(({ release, product }, index) => {
          const epuise = product.stockRestant <= 0;
          return (
            <div
              key={product.id}
              className="flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
            >
              <ReleaseCover
                release={release}
                src={product.imageUrl ?? release.coverUrl}
                index={index}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <p className="mt-4 text-lg font-semibold text-foreground">
                {product.name}
              </p>
              <p className="text-sm text-muted">
                {release.artistName}
                {product.name !== release.title && ` · ${release.title}`}
              </p>
              {release.releaseDate && (
                <p className="mt-1 text-xs text-subtle">
                  Sorti le {formatReleaseDate(release.releaseDate)}
                </p>
              )}
              {product.description && (
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted">
                  {product.description}
                </p>
              )}

              <div className="mt-auto flex items-center justify-between pt-4">
                <p className="text-lg font-semibold text-highlight">
                  {formatPrice(product.priceCents)}
                </p>
                <p
                  className={`text-xs font-medium ${
                    epuise
                      ? "rounded-full border border-highlight px-2.5 py-0.5 text-highlight"
                      : "text-subtle"
                  }`}
                >
                  {epuise ? "Épuisé" : `${product.stockRestant} en stock`}
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

      {freeListening.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold text-foreground">
            En écoute libre
          </h2>
          <p className="mt-2 text-muted">
            Nos derniers singles, à écouter gratuitement.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {freeListening.map((release, index) => {
              const embed = spotifyEmbedUrl(release.listenUrl!);
              return (
                <div
                  key={release.id}
                  className="flex flex-col gap-6 rounded-xl border border-line bg-surface p-6 sm:flex-row"
                >
                  <div className="w-full shrink-0 sm:w-40">
                    <ReleaseCover
                      release={release}
                      index={index}
                      sizes="(min-width: 640px) 160px, 100vw"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold text-foreground">
                        {release.title}
                      </p>
                      <span className="rounded-full bg-tag px-2.5 py-0.5 text-xs font-medium text-on-tag">
                        Single
                      </span>
                    </div>
                    <p className="text-sm text-muted">{release.artistName}</p>
                    {release.releaseDate && (
                      <p className="mt-1 text-xs text-subtle">
                        Sorti le {formatReleaseDate(release.releaseDate)}
                      </p>
                    )}
                    {embed ? (
                      <iframe
                        src={embed}
                        title={`${release.title} — ${release.artistName} sur Spotify`}
                        loading="lazy"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        className="mt-4 h-[152px] w-full rounded-xl border-0"
                      />
                    ) : (
                      <a
                        href={release.listenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-sm font-semibold text-highlight hover:text-foreground"
                      >
                        Écouter ↗
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </Container>
  );
}

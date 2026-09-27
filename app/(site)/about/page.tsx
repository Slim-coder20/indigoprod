import Container from "@/components/Container";

const BRANCHES = [
  {
    name: "Indigo Prod",
    badge: null,
    description:
      "Gestion et production de spectacles vivants (diffusion, administration, tournées).",
  },
  {
    name: "Indigo Records",
    badge: "Créé en 2026",
    description:
      "Production phonographique et accompagnement des projets enregistrés jusqu'à leur sortie.",
  },
];

const VALEURS = ["Écoute", "Dialogue", "Confiance"];

export default function About() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-highlight">
        À propos
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
        Qui <span className="text-[var(--mauve-dark)]">sommes-nous</span> ?
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Indigo est une structure indépendante basée à Tours, fondée en 2024 par
        Noria Bouha après des années d&apos;expérience dans le secteur musical. Née
        d&apos;une collaboration fondatrice avec Da Silva, elle propose un
        accompagnement artistique global, à taille humaine et sur-mesure.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {BRANCHES.map((branche) => (
          <div
            key={branche.name}
            className="rounded-xl border border-line bg-surface p-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-foreground">
                {branche.name}
              </h2>
              {branche.badge && (
                <span className="rounded-full bg-tag px-3 py-0.5 text-xs font-medium text-on-tag">
                  {branche.badge}
                </span>
              )}
            </div>
            <p className="mt-3 leading-7 text-muted">{branche.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl bg-band p-8 text-on-band sm:p-10">
        <div className="flex flex-wrap gap-2">
          {VALEURS.map((valeur) => (
            <span
              key={valeur}
              className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink"
            >
              {valeur}
            </span>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-xl leading-8">
          Fondée sur l&apos;écoute, le dialogue et la confiance, chaque branche
          partage une même vision : s&apos;adapter à la singularité de chaque
          artiste.
        </p>
      </div>
    </Container>
  );
}

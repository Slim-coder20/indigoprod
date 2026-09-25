import Container from "@/components/Container";

const VALEURS = [
  {
    title: "Exigence artistique",
    description:
      "Chaque projet est accompagné avec un souci constant de la qualité musicale et de l'identité de l'artiste.",
  },
  {
    title: "Indépendance",
    description:
      "IndigoProduction reste une structure indépendante, pour préserver la liberté créative de ses artistes.",
  },
  {
    title: "Proximité",
    description:
      "Un accompagnement humain, de la composition en studio jusqu'à la scène.",
  },
];

export default function About() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
        À propos
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50">
        Une maison de production à taille humaine
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        Fondée par des passionnés de musique, IndigoProduction accompagne des
        artistes émergents et confirmés dans la création, la production et la
        diffusion de leurs œuvres. De l&apos;enregistrement en studio à la
        tournée, nous mettons notre expertise au service de leur vision
        artistique.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {VALEURS.map((valeur) => (
          <div
            key={valeur.title}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <p className="text-lg font-semibold text-zinc-50">
              {valeur.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {valeur.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
        <h2 className="text-2xl font-semibold text-zinc-50">Notre mission</h2>
        <p className="mt-4 max-w-3xl text-zinc-400 leading-7">
          Offrir à chaque artiste les moyens de développer un univers sonore
          fort et cohérent, et le mettre en relation avec un public qui lui
          ressemble — sur disque, en boutique, comme sur scène.
        </p>
      </div>
    </Container>
  );
}

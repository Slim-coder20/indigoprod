import Container from "@/components/Container";
import { LEGAL, LEGAL_TODO } from "@/lib/legal";

// Valeur légale : surlignée tant qu'elle n'a pas été renseignée (« À COMPLÉTER »).
export function Val({ children }: { children: string }) {
  if (children !== LEGAL_TODO) return <>{children}</>;
  return (
    <mark className="rounded bg-yellow-200 px-1 font-medium text-black">
      {children}
    </mark>
  );
}

// Habillage commun aux pages légales : titre, date de mise à jour, sections.
export default function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-highlight">
        Informations légales
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      {intro && (
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{intro}</p>
      )}
      <p className="mt-4 text-sm text-subtle">
        Dernière mise à jour : {LEGAL.updatedAt}
      </p>
      <div className="mt-12 flex max-w-3xl flex-col gap-10">{children}</div>
    </Container>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-muted [&_a]:text-foreground [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-subtle [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

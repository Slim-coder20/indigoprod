import Container from "@/components/Container";
import { CONCERTS } from "@/lib/data/concerts";

export default function Concerts() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-highlight">
        Concerts
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
        Nos artistes sur scène
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Retrouvez les prochaines dates de nos artistes partout en France.
      </p>

      <div className="mt-12 divide-y divide-line rounded-xl border border-line">
        {CONCERTS.map((concert) => (
          <div
            key={concert.id}
            className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center"
          >
            <div>
              <p className="text-lg font-semibold text-foreground">
                {concert.artistName}
              </p>
              <p className="text-sm text-muted">
                {concert.venue}, {concert.city}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-mono text-sm font-medium text-accent">
                {new Date(concert.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <span className="rounded-full border border-line-strong px-4 py-2 text-xs font-semibold text-subtle">
                Billetterie bientôt disponible
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

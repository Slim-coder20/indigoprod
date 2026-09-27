import Link from "next/link";
import Container from "@/components/Container";
import { formatConcertDate, getUpcomingConcerts } from "@/lib/queries/concerts";

export default async function Concerts() {
  const concerts = await getUpcomingConcerts();

  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-highlight">
        Concerts
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
        Nos artistes sur scène
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Retrouvez les prochaines dates de nos artistes, en France et à
        l&apos;étranger.
      </p>

      {concerts.length === 0 ? (
        <p className="mt-12 rounded-xl border border-line bg-surface p-8 text-muted">
          Aucune date annoncée pour le moment. Revenez bientôt !
        </p>
      ) : (
        <ul className="mt-12 divide-y divide-line rounded-xl border border-line bg-surface">
          {concerts.map((concert) => (
            <li
              key={concert.id}
              className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center"
            >
              <div className="w-20 shrink-0 font-mono leading-tight text-highlight">
                <p className="text-3xl font-semibold">
                  {formatConcertDate(concert.date, { day: "2-digit" })}
                </p>
                <p className="text-xs uppercase">
                  {formatConcertDate(concert.date, {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex-1">
                <Link
                  href={`/artistes/${concert.artistSlug}`}
                  className="text-lg font-semibold text-foreground transition-colors hover:text-highlight"
                >
                  {concert.artistName}
                </Link>
                {concert.title && (
                  <p className="text-sm font-medium text-foreground">
                    {concert.title}
                  </p>
                )}
                <p className="text-sm text-muted">
                  {concert.venue === concert.title
                    ? concert.city
                    : `${concert.venue}, ${concert.city}`}
                </p>
                <p className="mt-1 text-xs capitalize text-subtle">
                  {formatConcertDate(concert.date)}
                </p>
              </div>

              {concert.ticketUrl ? (
                <a
                  href={concert.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
                >
                  Billetterie ↗
                </a>
              ) : (
                <span className="w-fit rounded-full border border-line-strong px-4 py-2 text-xs font-semibold text-subtle">
                  Billetterie bientôt disponible
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

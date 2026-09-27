import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import { formatConcertDate } from "@/lib/queries/concerts";
import FlashMessage from "@/components/admin/FlashMessage";

const FLASH = {
  created: "Concert ajouté.",
  updated: "Concert modifié.",
  deleted: "Concert supprimé.",
};

export default async function AdminConcertsPage({
  searchParams,
}: PageProps<"/admin/concerts">) {
  await requireAdmin();
  const { ok } = await searchParams;

  const today = new Date(new Date().toISOString().slice(0, 10));
  const include = { artist: { select: { name: true } } };
  const [upcoming, past] = await Promise.all([
    prisma.concert.findMany({
      where: { date: { gte: today } },
      orderBy: { date: "asc" },
      include,
    }),
    prisma.concert.findMany({
      where: { date: { lt: today } },
      orderBy: { date: "desc" },
      include,
    }),
  ]);

  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Concerts</h1>
        <Link
          href="/admin/concerts/nouveau"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
        >
          + Ajouter un concert
        </Link>
      </div>

      <FlashMessage message={FLASH[ok as keyof typeof FLASH]} />

      <ConcertList
        title={`À venir (${upcoming.length})`}
        concerts={upcoming}
        empty="Aucun concert à venir."
      />
      <ConcertList
        title={`Passés (${past.length})`}
        concerts={past}
        empty="Aucun concert passé."
        muted
      />
    </div>
  );
}

function ConcertList({
  title,
  concerts,
  empty,
  muted,
}: {
  title: string;
  concerts: {
    id: string;
    title: string | null;
    venue: string;
    city: string;
    date: Date;
    artist: { name: string };
  }[];
  empty: string;
  muted?: boolean;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {concerts.length === 0 ? (
        <p className="mt-3 text-sm text-muted">{empty}</p>
      ) : (
        <ul
          className={`mt-3 divide-y divide-line rounded-xl border border-line bg-surface ${muted ? "opacity-75" : ""}`}
        >
          {concerts.map((concert) => (
            <li key={concert.id}>
              <Link
                href={`/admin/concerts/${concert.id}`}
                className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3 text-sm transition-colors hover:bg-surface-strong"
              >
                <span className="font-medium text-foreground">
                  {concert.artist.name}
                  <span className="font-normal text-muted">
                    {" "}
                    — {concert.title ? `${concert.title}, ` : ""}
                    {concert.venue}, {concert.city}
                  </span>
                </span>
                <span className="text-subtle">
                  {formatConcertDate(concert.date.toISOString().slice(0, 10))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

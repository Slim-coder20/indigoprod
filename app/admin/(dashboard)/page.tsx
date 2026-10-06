import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import { formatConcertDate } from "@/lib/queries/concerts";

// Seuil à partir duquel un produit est signalé en stock bas.
const LOW_STOCK = 5;

export default async function AdminDashboardPage() {
  await requireAdmin();

  const today = new Date(new Date().toISOString().slice(0, 10));
  const upcoming = { date: { gte: today } };
  const [
    artistCount,
    upcomingCount,
    upcomingConcerts,
    activeProductCount,
    paidOrderCount,
    lowStock,
  ] = await Promise.all([
    prisma.artist.count(),
    prisma.concert.count({ where: upcoming }),
    prisma.concert.findMany({
      where: upcoming,
      orderBy: { date: "asc" },
      take: 5,
      include: { artist: { select: { name: true } } },
    }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.product.findMany({
      where: { active: true, stockRestant: { lte: LOW_STOCK } },
      orderBy: { stockRestant: "asc" },
      select: { id: true, name: true, stockRestant: true },
    }),
  ]);

  const stats = [
    { label: "Artistes", value: artistCount },
    { label: "Concerts à venir", value: upcomingCount },
    { label: "Produits en vente", value: activeProductCount },
    { label: "Commandes payées", value: paidOrderCount },
  ];

  return (
    <div className="flex max-w-4xl flex-col gap-10">
      <h1 className="text-2xl font-semibold text-foreground">
        Tableau de bord
      </h1>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-line bg-surface p-5"
          >
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Prochains concerts
        </h2>
        {upcomingConcerts.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Aucun concert à venir.</p>
        ) : (
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
            {upcomingConcerts.map((concert) => (
              <li
                key={concert.id}
                className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3 text-sm"
              >
                <span className="font-medium text-foreground">
                  {concert.artist.name}
                  <span className="font-normal text-muted">
                    {" "}
                    — {concert.venue}, {concert.city}
                  </span>
                </span>
                <span className="text-subtle">
                  {formatConcertDate(concert.date.toISOString().slice(0, 10))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">Stock bas</h2>
        {lowStock.length === 0 ? (
          <p className="mt-3 text-sm text-muted">
            Aucun produit sous {LOW_STOCK} exemplaires.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
            {lowStock.map((product) => (
              <li
                key={product.id}
                className="flex justify-between gap-2 px-5 py-3 text-sm"
              >
                <span className="text-foreground">{product.name}</span>
                <span
                  className={
                    product.stockRestant <= 0
                      ? "font-medium text-highlight"
                      : "text-muted"
                  }
                >
                  {product.stockRestant <= 0
                    ? "Épuisé"
                    : `${product.stockRestant} restant(s)`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

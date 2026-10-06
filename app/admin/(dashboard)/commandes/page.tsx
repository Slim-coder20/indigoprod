import Link from "next/link";
import type { OrderStatus } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/auth";
import { formatPrice } from "@/lib/format";

const STATUS_LABEL: Record<OrderStatus, string> = {
  PAID: "Payée",
  PENDING: "En attente de paiement",
  CANCELLED: "Annulée",
  REFUNDED: "Remboursée",
};

// Onglets de filtre : `key` est la valeur de ?statut=
const FILTERS: { key: string; label: string; status?: OrderStatus }[] = [
  { key: "payees", label: "Payées", status: "PAID" },
  { key: "remboursees", label: "Remboursées", status: "REFUNDED" },
  { key: "annulees", label: "Annulées", status: "CANCELLED" },
  { key: "en-attente", label: "En attente", status: "PENDING" },
  { key: "toutes", label: "Toutes" },
];

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Europe/Paris",
});

const countryNames = new Intl.DisplayNames(["fr"], { type: "region" });

function countryName(code: string | null): string | null {
  if (!code) return null;
  try {
    return countryNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export default async function AdminOrdersPage({
  searchParams,
}: PageProps<"/admin/commandes">) {
  await requireAdmin();
  const { statut } = await searchParams;

  const filter =
    FILTERS.find((f) => f.key === statut) ?? FILTERS[0];

  const [orders, counts] = await Promise.all([
    prisma.order.findMany({
      where: filter.status ? { status: filter.status } : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        items: {
          include: { product: { select: { name: true } } },
          orderBy: { id: "asc" },
        },
      },
    }),
    prisma.order.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const countOf = (status?: OrderStatus) =>
    counts
      .filter((c) => !status || c.status === status)
      .reduce((n, c) => n + c._count._all, 0);

  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <h1 className="text-2xl font-semibold text-foreground">Commandes</h1>

      <nav className="flex flex-wrap gap-2" aria-label="Filtrer les commandes">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={`/admin/commandes?statut=${f.key}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              f.key === filter.key
                ? "bg-accent text-on-accent"
                : "border border-line-strong text-muted hover:border-accent hover:text-foreground"
            }`}
          >
            {f.label} ({countOf(f.status)})
          </Link>
        ))}
      </nav>

      {orders.length === 0 ? (
        <p className="text-sm text-muted">Aucune commande dans cette liste.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => {
            const address = [
              order.shippingName,
              order.shippingLine1,
              order.shippingLine2,
              [order.shippingPostalCode, order.shippingCity]
                .filter(Boolean)
                .join(" "),
              countryName(order.shippingCountry),
            ].filter(Boolean);
            const itemsCents = order.totalCents - order.shippingCents;

            return (
              <li
                key={order.id}
                className="rounded-xl border border-line bg-surface"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 p-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      {order.customerName ?? "Client sans nom"}
                      <span className="ml-2 rounded-full bg-tag px-2 py-0.5 align-middle text-xs font-medium text-on-tag">
                        {STATUS_LABEL[order.status]}
                      </span>
                    </p>
                    <p className="text-sm text-muted">
                      {dateFormat.format(order.createdAt)}
                      {order.email && (
                        <>
                          {" · "}
                          <a
                            href={`mailto:${order.email}`}
                            className="hover:text-foreground"
                          >
                            {order.email}
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {formatPrice(order.totalCents)}
                  </p>
                </div>

                <div className="grid gap-4 border-t border-line p-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="font-medium text-foreground">
                      Adresse de livraison
                    </p>
                    {address.length > 0 ? (
                      <address className="mt-1 not-italic text-muted">
                        {address.map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    ) : (
                      <p className="mt-1 text-subtle">Non renseignée.</p>
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-foreground">Articles</p>
                    <ul className="mt-1 text-muted">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between gap-4"
                        >
                          <span>
                            {item.quantity} × {item.product.name}
                          </span>
                          <span>
                            {formatPrice(item.unitPriceCents * item.quantity)}
                          </span>
                        </li>
                      ))}
                      <li className="mt-1 flex justify-between gap-4 border-t border-line pt-1">
                        <span>Articles</span>
                        <span>{formatPrice(itemsCents)}</span>
                      </li>
                      <li className="flex justify-between gap-4">
                        <span>Frais de port</span>
                        <span>
                          {order.shippingCents > 0
                            ? formatPrice(order.shippingCents)
                            : "Offerts"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {order.stripePaymentIntentId && (
                  <div className="border-t border-line px-4 py-3 text-xs text-subtle">
                    <a
                      href={`https://dashboard.stripe.com/payments/${order.stripePaymentIntentId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-highlight hover:text-foreground"
                    >
                      Voir le paiement dans Stripe ↗
                    </a>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

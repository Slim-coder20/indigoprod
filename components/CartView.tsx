"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore, useTransition } from "react";
import { createCheckoutSession } from "@/app/(site)/panier/actions";
import { removeItem, setQuantity, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

// false pendant le rendu serveur et l'hydratation, true ensuite : évite
// d'afficher « panier vide » une fraction de seconde alors qu'il est rempli.
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function CartView() {
  const hydrated = useHydrated();
  const { items, count, totalCents } = useCart();
  // Les hooks restent avant les `return` anticipés (règle des hooks).
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleCheckout() {
    setError(null);
    startTransition(async () => {
      const result = await createCheckoutSession(
        items.map(({ productId, quantity }) => ({ productId, quantity })),
      );
      if (result.ok) {
        window.location.assign(result.url); // quitte le site vers Stripe
      } else {
        setError(result.error);
      }
    });
  }

  if (!hydrated) {
    return <div className="mt-10 h-40 animate-pulse rounded-xl bg-surface" />;
  }

  if (items.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-muted">Votre panier est vide.</p>
        <Link
          href="/boutique"
          className="mt-4 inline-block text-sm font-semibold text-highlight hover:text-foreground"
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex flex-wrap items-center gap-4 p-4"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-ink">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={`Pochette de ${item.name}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{item.name}</p>
              <p className="text-sm text-muted">{item.artistName}</p>
              <p className="text-sm text-subtle">
                {formatPrice(item.priceCents)} l’unité
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={`Retirer une unité de ${item.name}`}
                disabled={item.quantity <= 1}
                onClick={() => setQuantity(item.productId, item.quantity - 1)}
                className="h-8 w-8 rounded-full border border-line-strong text-foreground transition-colors hover:bg-surface-strong disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>
              <span
                className="w-6 text-center text-sm text-foreground"
                aria-live="polite"
              >
                {item.quantity}
              </span>
              <button
                type="button"
                aria-label={`Ajouter une unité de ${item.name}`}
                disabled={item.quantity >= item.maxQuantity}
                onClick={() => setQuantity(item.productId, item.quantity + 1)}
                className="h-8 w-8 rounded-full border border-line-strong text-foreground transition-colors hover:bg-surface-strong disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>

            <p className="w-24 text-right font-semibold text-highlight">
              {formatPrice(item.priceCents * item.quantity)}
            </p>

            <button
              type="button"
              onClick={() => removeItem(item.productId)}
              className="text-sm text-subtle transition-colors hover:text-foreground"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-lg text-foreground">
            Total :{" "}
            <span className="font-semibold">{formatPrice(totalCents)}</span>
          </p>
          <p className="text-xs text-subtle">
            {count} article{count > 1 ? "s" : ""} · le prix final est confirmé
            au paiement
          </p>
        </div>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={pending}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Redirection…" : "Payer"}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-4 text-sm text-highlight">
          {error}
        </p>
      )}
    </div>
  );
}

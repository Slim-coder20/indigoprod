"use client";

import { addItem, useCart } from "@/lib/cart";

type Props = {
  productId: string;
  name: string;
  artistName: string;
  priceCents: number;
  imageUrl?: string;
  stockRestant: number;
};

export default function AddToCartButton({ stockRestant, ...product }: Props) {
  const { items } = useCart();
  const inCart =
    items.find((i) => i.productId === product.productId)?.quantity ?? 0;
  const unavailable = stockRestant <= 0 || inCart >= stockRestant;

  return (
    <button
      type="button"
      disabled={unavailable}
      onClick={() => addItem({ ...product, maxQuantity: stockRestant })}
      className="mt-4 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:border disabled:border-line-strong disabled:bg-transparent disabled:text-subtle"
    >
      {stockRestant <= 0
        ? "Indisponible"
        : inCart >= stockRestant
          ? "Stock maximum atteint"
          : inCart > 0
            ? `Ajouter (${inCart} dans le panier)`
            : "Ajouter au panier"}
    </button>
  );
}
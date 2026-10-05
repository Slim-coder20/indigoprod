"use client";

import { useMemo, useSyncExternalStore } from "react";

export type CartItem = {
  productId: string;
  name: string;
  artistName: string;
  priceCents: number; // affichage seulement : le serveur recalculera
  imageUrl?: string; // pochette de l'édition, pour l'affichage
  quantity: number;
  maxQuantity: number; // stockRestant au moment de l'ajout
};

const STORAGE_KEY = "indigo-cart";
const EMPTY = "[]";

// Les composants qui lisent le panier s'abonnent ici pour être prévenus.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener); // autre onglet
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

// Snapshot = la chaîne brute (une string est stable entre deux appels,
// contrairement à un tableau qu'on reparserait à chaque fois).
function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    return EMPTY; // navigation privée, stockage bloqué…
  }
}

function getServerSnapshot(): string {
  return EMPTY; // le serveur ne connaît pas le panier
}

function parse(raw: string): CartItem[] {
  try {
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? (data as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    return;
  }
  listeners.forEach((listener) => listener()); // prévient les composants
}

// --- Actions (appelables depuis n'importe quel composant client) ---

export function addItem(item: Omit<CartItem, "quantity">) {
  if (item.maxQuantity <= 0) return;
  const items = parse(getSnapshot());
  const existing = items.find((i) => i.productId === item.productId);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + 1, item.maxQuantity);
    existing.maxQuantity = item.maxQuantity;
  } else {
    items.push({ ...item, quantity: 1 });
  }
  write(items);
}

export function setQuantity(productId: string, quantity: number) {
  const items = parse(getSnapshot()).map((i) =>
    i.productId === productId
      ? { ...i, quantity: Math.min(Math.max(quantity, 1), i.maxQuantity) }
      : i,
  );
  write(items);
}

export function removeItem(productId: string) {
  write(parse(getSnapshot()).filter((i) => i.productId !== productId));
}

export function clearCart() {
  write([]);
}

// --- Hook de lecture ---

export function useCart() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items = useMemo(() => parse(raw), [raw]);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const totalCents = items.reduce((n, i) => n + i.priceCents * i.quantity, 0);
  return { items, count, totalCents };
}
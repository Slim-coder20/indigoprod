"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

const cartSchema = z
  .array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().min(1).max(20),
    }),
  )
  .min(1)
  .max(50);

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

export async function createCheckoutSession(
  input: unknown,
): Promise<CheckoutResult> {
  // Vérifié avant de créer quoi que ce soit : sans URL de retour, la session
  // Stripe échouerait et laisserait une commande orpheline.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    console.error("[checkout] NEXT_PUBLIC_SITE_URL manquante.");
    return {
      ok: false,
      error: "Le paiement est momentanément indisponible. Réessayez plus tard.",
    };
  }

  // 1. Valider : une server action est un endpoint public, `input` est
  // donc de la donnée non fiable, quel que soit le type TypeScript.
  const parsed = cartSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Panier invalide." };

  // Regrouper les doublons éventuels (même produit en 2 lignes)
  const quantities = new Map<string, number>();
  for (const { productId, quantity } of parsed.data) {
    quantities.set(productId, (quantities.get(productId) ?? 0) + quantity);
  }

  // 2. Relire prix et stock en base
  const products = await prisma.product.findMany({
    where: { id: { in: [...quantities.keys()] }, active: true },
  });
  if (products.length !== quantities.size) {
    return { ok: false, error: "Un article n'est plus disponible." };
  }
  for (const product of products) {
    const wanted = quantities.get(product.id)!;
    if (wanted > product.stockRestant) {
      return {
        ok: false,
        error: `Stock insuffisant pour « ${product.name} » (${product.stockRestant} restant).`,
      };
    }
  }

  // 3. Créer la commande PENDING (prix figés à cet instant)
  const itemsCents = products.reduce(
    (sum, p) => sum + p.priceCents * quantities.get(p.id)!,
    0,
  );
  // Un seul colis par commande : on facture les frais de port les plus élevés
  // parmi les produits du panier (fixés par produit dans l'admin).
  const shippingCents = Math.max(...products.map((p) => p.shippingCents));
  const order = await prisma.order.create({
    data: {
      totalCents: itemsCents + shippingCents,
      shippingCents,
      items: {
        create: products.map((p) => ({
          productId: p.id,
          quantity: quantities.get(p.id)!,
          unitPriceCents: p.priceCents,
        })),
      },
    },
  });

  // 4. Créer la session Stripe
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      line_items: products.map((p) => ({
        quantity: quantities.get(p.id)!,
        price_data: {
          currency: "eur",
          unit_amount: p.priceCents, // déjà en centimes
          product_data: { name: p.name },
        },
      })),
      // Adresse de livraison saisie sur la page Stripe, récupérée par le
      // webhook. Pays desservis : à élargir au besoin.
      shipping_address_collection: { allowed_countries: ["FR"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: shippingCents > 0 ? "Livraison" : "Livraison offerte",
            fixed_amount: { amount: shippingCents, currency: "eur" },
          },
        },
      ],
      client_reference_id: order.id,
      metadata: { orderId: order.id }, // le webhook retrouvera la commande
      success_url: `${siteUrl}/boutique/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/panier`,
    });
    if (!session.url) throw new Error("Stripe n'a pas renvoyé d'URL.");

    // 5. Relier la commande à la session
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });
    return { ok: true, url: session.url };
  } catch (error) {
    console.error("[checkout] Échec de création de la session :", error);
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "CANCELLED" },
    });
    return {
      ok: false,
      error: "Le paiement est momentanément indisponible. Réessayez plus tard.",
    };
  }
}
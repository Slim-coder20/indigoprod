import "server-only";
import type Stripe from "stripe";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

function orderIdOf(session: Stripe.Checkout.Session): string | null {
  return session.metadata?.orderId ?? session.client_reference_id ?? null;
}

// Paiement confirmé par Stripe : commande PAID + décrément du stock.
// Idempotent : un événement reçu deux fois ne décrémente le stock qu'une fois.
export async function fulfillOrder(session: Stripe.Checkout.Session) {
  const orderId = orderIdOf(session);
  if (!orderId) {
    console.warn("[webhook] Session sans orderId, ignorée :", session.id);
    return;
  }
  // Paiement différé (ex. virement) : pas encore encaissé.
  if (session.payment_status !== "paid") return;

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);

  const processed = await prisma.$transaction(async (tx) => {
    // « Revendiquer » la commande : l'update ne réussit que si elle est
    // encore PENDING. À la 2e livraison du même événement, count vaut 0.
    const claimed = await tx.order.updateMany({
      where: { id: orderId, status: "PENDING" },
      data: {
        status: "PAID",
        email: session.customer_details?.email ?? null,
        customerName: session.customer_details?.name ?? null,
        stripePaymentIntentId: paymentIntentId,
      },
    });
    if (claimed.count === 0) return false;

    const items = await tx.orderItem.findMany({ where: { orderId } });
    for (const item of items) {
      const updated = await tx.product.updateMany({
        where: { id: item.productId, stockRestant: { gte: item.quantity } },
        data: { stockRestant: { decrement: item.quantity } },
      });
      if (updated.count === 0) {
        // Survente : le client a payé mais le stock a été épuisé entre-temps.
        console.error(
          `[webhook] Stock insuffisant (commande ${orderId}, produit ${item.productId}) : à rembourser ou à traiter à la main.`,
        );
      }
    }
    return true;
  });

  // Les sorties de la Boutique sont mises en cache : on force le rafraîchissement.
  if (processed) revalidateTag("releases", { expire: 0 });
}

// Session Checkout expirée sans paiement : la commande est annulée.
export async function cancelOrder(session: Stripe.Checkout.Session) {
  const orderId = orderIdOf(session);
  if (!orderId) return;
  await prisma.order.updateMany({
    where: { id: orderId, status: "PENDING" },
    data: { status: "CANCELLED" },
  });
}

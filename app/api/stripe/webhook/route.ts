import type Stripe from "stripe";
import { cancelOrder, fulfillOrder } from "@/lib/orders";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return new Response("Webhook mal configuré.", { status: 400 });
  }

  // Corps BRUT : indispensable pour que la signature soit vérifiable.
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    return new Response("Signature invalide.", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await fulfillOrder(event.data.object);
        break;
      case "checkout.session.expired":
        await cancelOrder(event.data.object);
        break;
      default:
        // Événement non géré : 200 pour que Stripe n'insiste pas.
        break;
    }
  } catch (error) {
    console.error(`[webhook] Échec du traitement de ${event.type} :`, error);
    // 500 : Stripe retentera plus tard (la base était peut-être indisponible).
    return new Response("Erreur de traitement.", { status: 500 });
  }

  return new Response(null, { status: 200 });
}

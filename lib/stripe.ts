import "server-only";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY est manquante dans les variables d'environnement.",
  );
}

// Client Stripe unique, réutilisé entre les rechargements à chaud en dev.
// Serveur uniquement (`server-only`) : la clé secrète ne doit jamais
// arriver dans le bundle navigateur.
const globalForStripe = globalThis as unknown as { stripe?: Stripe };

export const stripe = globalForStripe.stripe ?? new Stripe(secretKey);

if (process.env.NODE_ENV !== "production") globalForStripe.stripe = stripe;
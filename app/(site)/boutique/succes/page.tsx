import Link from "next/link";
import ClearCart from "@/components/ClearCart";
import Container from "@/components/Container";
import { stripe } from "@/lib/stripe";

export const metadata = { title: "Commande confirmée" };

export default async function SuccesPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let paid = false;
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paid = session.payment_status === "paid";
    } catch {
      // identifiant invalide : on affiche le message neutre
    }
  }

  return (
    <Container className="py-20">
      {paid && <ClearCart />}
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        {paid ? "Merci pour votre commande !" : "Commande en cours de traitement"}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        {paid
          ? "Votre paiement est confirmé. Nous préparons votre commande."
          : "Nous n'avons pas pu confirmer le paiement. Si vous avez été débité, contactez-nous."}
      </p>
      <Link
        href="/boutique"
        className="mt-8 inline-block text-sm font-semibold text-highlight hover:text-foreground"
      >
        Retour à la boutique
      </Link>
    </Container>
  );
}
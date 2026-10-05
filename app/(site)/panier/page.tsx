import type { Metadata } from "next";
import CartView from "@/components/CartView";
import Container from "@/components/Container";

export const metadata: Metadata = { title: "Panier" };

export default function PanierPage() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-highlight">
        Boutique
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
        Votre panier
      </h1>
      <CartView />
    </Container>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Habillage des pages publiques (l'espace admin a son propre layout).
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

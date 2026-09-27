import type { Metadata } from "next";

// L'espace admin ne doit pas apparaître dans les moteurs de recherche.
export const metadata: Metadata = {
  title: "Administration — IndigoProduction",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}

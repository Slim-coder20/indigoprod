import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono, Instrument_Serif, Roboto } from "next/font/google";
import "./globals.css";
import CookieNotice from "@/components/CookieNotice";

// Titres (h1–h4) : voir @layer base dans globals.css
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

// Fiches artistes : noms et titres de section en serif, biographies en DM Sans
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IndigoProduction — Maison de production musicale",
  description:
    "IndigoProduction accompagne ses artistes de l'enregistrement à la scène : albums, concerts et boutique.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${instrumentSerif.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}

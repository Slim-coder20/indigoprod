"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Bannière d'information : le site n'utilise que des cookies techniques
// (panier, espace d'administration), donc il n'y a rien à accepter ni à refuser.
const STORAGE_KEY = "indigo-cookie-notice-ack";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Stockage indisponible (navigation privée, blocage) : on affiche la bannière.
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Sans stockage, la bannière réapparaîtra à la prochaine visite.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Information sur les cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface p-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted">
          Ce site utilise uniquement des cookies techniques, nécessaires à son
          fonctionnement (panier, espace d&apos;administration). Aucun cookie
          publicitaire ni de mesure d&apos;audience.{" "}
          <Link
            href="/confidentialite"
            className="font-medium text-foreground underline underline-offset-4"
          >
            En savoir plus
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
        >
          J&apos;ai compris
        </button>
      </div>
    </div>
  );
}

import Link from "next/link";
import Container from "./Container";
import { NAV_LINKS } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <p className="text-lg font-semibold tracking-tight text-zinc-50">
            Indigo<span className="text-indigo-400">Production</span>
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Maison de production musicale indépendante. Nous accompagnons nos
            artistes de l&apos;enregistrement à la scène.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-200">Navigation</p>
          <ul className="mt-3 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-zinc-400 hover:text-indigo-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-200">Nous suivre</p>
          <ul className="mt-3 flex flex-col gap-2">
            {["Instagram", "Spotify", "YouTube"].map((social) => (
              <li key={social}>
                <span className="text-sm text-zinc-400">{social}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-zinc-900">
        <Container className="py-6">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} IndigoProduction. Tous droits
            réservés.
          </p>
        </Container>
      </div>
    </footer>
  );
}

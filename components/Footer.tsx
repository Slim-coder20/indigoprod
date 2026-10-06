import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { NAV_LINKS } from "@/lib/nav";
import { CONTACT } from "@/lib/contact";
import { LEGAL_LINKS } from "@/lib/legal";
import logo from "@/public/logo-indigo.png";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <p className="text-lg font-semibold tracking-tight text-foreground">
            Indigo<span className="text-highlight">Production</span>
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Maison de production musicale indépendante. Nous accompagnons nos
            artistes de l&apos;enregistrement à la scène.
          </p>
          <Image src={logo} alt="Logo Indigo" className="mt-6 h-12 w-auto" />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Navigation</p>
          <ul className="mt-3 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Nous suivre</p>
          <ul className="mt-3 flex flex-col gap-2">
            {CONTACT.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {social.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <p>Développé par <a href="https://www.slim-abida.dev" target="_blank" rel="noopener noreferrer">Slim Abida</a> pour Indigo Production</p>
            <p>
              © {new Date().getFullYear()} IndigoProduction. Tous droits
              réservés.
            </p>
            <nav aria-label="Informations légales">
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p>
            Licences d&apos;entrepreneur de spectacles :{" "}
            {CONTACT.licences.map((licence, i) => (
              <span key={licence}>
                {i > 0 && " · "}
                <span className="whitespace-nowrap font-mono">{licence}</span>
              </span>
            ))}
          </p>
        </Container>
      </div>
    </footer>
  );
}

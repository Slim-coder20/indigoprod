import Image from "next/image";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import { CONTACT } from "@/lib/contact";
import logo from "@/public/logo-indigo.png";

export default function Contact() {
  return (
    <Container className="py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-highlight">
        Contact
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
        Parlons de votre projet
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Une question sur un artiste, une demande de booking ou un partenariat ?
        Écrivez-nous.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ContactForm />

        <div className="rounded-xl border border-line bg-surface p-8">
          <p className="text-sm font-semibold text-foreground">Coordonnées</p>
          <dl className="mt-4 flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-subtle">Email</dt>
              <dd>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-foreground underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-subtle">Téléphone</dt>
              {CONTACT.phones.map((phone) => (
                <dd key={phone.href}>
                  <a
                    href={phone.href}
                    className="text-foreground transition-colors hover:text-highlight"
                  >
                    {phone.label}
                  </a>
                </dd>
              ))}
            </div>
            <div>
              <dt className="text-subtle">Ville</dt>
              <dd className="text-foreground">{CONTACT.city}</dd>
            </div>
          </dl>
          <Image src={logo} alt="Logo Indigo" className="mt-8 h-14 w-auto" />
        </div>
      </div>
    </Container>
  );
}

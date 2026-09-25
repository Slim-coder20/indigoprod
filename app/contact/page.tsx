import Container from "@/components/Container";

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
        Une question sur un artiste, une demande de booking ou un partenariat
        ? Écrivez-nous.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <form className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-foreground outline-none focus:border-accent"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-foreground outline-none focus:border-accent"
              placeholder="vous@exemple.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-foreground outline-none focus:border-accent"
              placeholder="Votre message"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-fit rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
          >
            Envoyer le message
          </button>
        </form>

        <div className="rounded-xl border border-line bg-surface p-8">
          <p className="text-sm font-semibold text-foreground">
            Coordonnées
          </p>
          <dl className="mt-4 flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-subtle">Email</dt>
              <dd className="text-foreground">contact@indigoproduction.fr</dd>
            </div>
            <div>
              <dt className="text-subtle">Téléphone</dt>
              <dd className="text-foreground">+33 1 23 45 67 89</dd>
            </div>
            <div>
              <dt className="text-subtle">Adresse</dt>
              <dd className="text-foreground">
                12 rue des Studios, 75011 Paris
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Container>
  );
}

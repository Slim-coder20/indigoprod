import Link from "next/link";
import LegalPage, { LegalSection, Val } from "@/components/LegalPage";
import { CONTACT } from "@/lib/contact";
import { LEGAL } from "@/lib/legal";

export const metadata = { title: "Mentions légales" };

export default function MentionsLegales() {
  return (
    <LegalPage
      title="Mentions légales"
      intro="Informations légales relatives au site indigoprod.fr, conformément à la loi du 21 juin 2004 pour la confiance dans l'économie numérique."
    >
      <LegalSection title="Éditeur du site">
        <p>
          Le site <strong>indigoprod.fr</strong> est édité par{" "}
          <strong>
            <Val>{LEGAL.companyName}</Val>
          </strong>{" "}
          (nom commercial : {LEGAL.brand}).
        </p>
        <ul>
          <li>
            Forme juridique : <Val>{LEGAL.legalForm}</Val>
          </li>
          <li>
            SIRET : <Val>{LEGAL.siret}</Val>
          </li>
          <li>
            Siège social : <Val>{LEGAL.address}</Val>
          </li>
          <li>
            Capital social : <Val>{LEGAL.shareCapital}</Val>
          </li>
          <li>
            Immatriculation : <Val>{LEGAL.rcs}</Val>
          </li>
          <li>
            TVA : <Val>{LEGAL.vat}</Val>
          </li>
          <li>
            Email :{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
          <li>
            Téléphone :{" "}
            {CONTACT.phones.map((phone, i) => (
              <span key={phone.href}>
                {i > 0 && " · "}
                <a href={phone.href}>{phone.label}</a>
              </span>
            ))}
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Directeur de la publication">
        <p>{LEGAL.publicationDirector}.</p>
      </LegalSection>

      <LegalSection title="Licences d'entrepreneur de spectacles vivants">
        <p>
          {LEGAL.brand} est titulaire des licences d&apos;entrepreneur de
          spectacles vivants suivantes :{" "}
          {CONTACT.licences.map((licence, i) => (
            <span key={licence}>
              {i > 0 && " · "}
              <span className="whitespace-nowrap font-mono">{licence}</span>
            </span>
          ))}
          .
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le site est hébergé par <strong>{LEGAL.host.name}</strong>,{" "}
          {LEGAL.host.address} —{" "}
          <a href={LEGAL.host.website} target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
          .
        </p>
        <p>
          Les données (catalogue, commandes) sont stockées dans une base de
          données PostgreSQL fournie par <strong>Supabase</strong>. Voir la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link> pour le
          détail des traitements.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus du site (textes, logos, pochettes,
          photographies, vidéos, enregistrements sonores) est protégé par le
          droit d&apos;auteur et les droits voisins. Ils appartiennent à{" "}
          {LEGAL.brand}, aux artistes ou à leurs ayants droit, ou sont utilisés
          avec leur autorisation. Les crédits photographiques sont indiqués à
          côté des images concernées.
        </p>
        <p>
          Toute reproduction, représentation, modification ou exploitation, même
          partielle, sans autorisation écrite préalable est interdite.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          {LEGAL.brand} s&apos;efforce de fournir des informations exactes et à
          jour, mais ne peut garantir l&apos;absence d&apos;erreur ou
          d&apos;omission. Le site peut contenir des liens vers des sites tiers
          (plateformes d&apos;écoute, réseaux sociaux) dont {LEGAL.brand} ne
          contrôle pas le contenu.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Le traitement de vos données personnelles est décrit dans notre{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Le site et ces mentions légales sont soumis au droit français. Pour
          les achats effectués sur la boutique, consultez nos{" "}
          <Link href="/cgv">conditions générales de vente</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

import LegalPage, { LegalSection, Val } from "@/components/LegalPage";
import { CONTACT } from "@/lib/contact";
import { LEGAL } from "@/lib/legal";

export const metadata = { title: "Politique de confidentialité" };

// À mettre à jour si un outil de mesure d'audience, de publicité ou un
// nouveau prestataire est ajouté au site : ce texte affirme aujourd'hui
// qu'aucun traceur n'est utilisé.
export default function Confidentialite() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Cette page explique quelles données personnelles nous collectons sur indigoprod.fr, pourquoi, et quels sont vos droits."
    >
      <LegalSection title="Responsable du traitement">
        <p>
          Le responsable du traitement est{" "}
          <strong>
            <Val>{LEGAL.companyName}</Val>
          </strong>{" "}
          ({LEGAL.brand}), <Val>{LEGAL.address}</Val>. Pour toute question :{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Données collectées et finalités">
        <ul>
          <li>
            <strong>Formulaire de contact</strong> : nom, adresse email et
            message, pour répondre à votre demande (base légale : votre
            demande / notre intérêt légitime à vous répondre).
          </li>
          <li>
            <strong>Commandes</strong> : nom, adresse email, adresse de
            livraison, contenu de la commande, pour traiter, expédier et
            suivre votre commande (base légale : exécution du contrat), et pour
            respecter nos obligations comptables et fiscales (obligation
            légale).
          </li>
          <li>
            <strong>Paiement</strong> : traité directement par Stripe. Nous ne
            recevons ni ne conservons votre numéro de carte bancaire.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Destinataires et prestataires">
        <p>Vos données sont accessibles uniquement à l&apos;équipe d&apos;{LEGAL.brand} et à nos prestataires techniques :</p>
        <ul>
          <li>
            <strong>Stripe</strong> : traitement des paiements ;
          </li>
          <li>
            <strong>Vercel</strong> : hébergement du site ;
          </li>
          <li>
            <strong>Supabase</strong> : base de données (commandes, catalogue),
            hébergée dans l&apos;Union européenne ;
          </li>
          <li>
            <strong>Resend</strong> : envoi des messages du formulaire de
            contact.
          </li>
        </ul>
        <p>
          Certains de ces prestataires peuvent traiter des données en dehors de
          l&apos;Union européenne, notamment aux États-Unis, avec des garanties
          appropriées (clauses contractuelles types de la Commission
          européenne ou cadre de protection des données UE–États-Unis). Nous ne
          vendons pas vos données.
        </p>
      </LegalSection>

      <LegalSection title="Durées de conservation">
        <ul>
          <li>Messages du formulaire de contact : 3 ans maximum.</li>
          <li>
            Commandes et données associées : 10 ans, conformément aux
            obligations comptables.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Cookies et stockage local">
        <p>
          Le site ne dépose <strong>aucun cookie publicitaire ni de mesure
          d&apos;audience</strong>. Le contenu de votre panier est enregistré
          dans le stockage local de votre navigateur, uniquement pour le
          fonctionnement de la boutique ; il n&apos;est pas transmis avant que
          vous validiez la commande. Des cookies techniques sont utilisés
          uniquement pour la connexion à l&apos;espace d&apos;administration,
          réservé à l&apos;équipe.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Vous disposez des droits d&apos;accès, de rectification,
          d&apos;effacement, d&apos;opposition, de limitation et de
          portabilité de vos données. Pour les exercer, écrivez-nous à{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Nous
          pouvons vous demander un justificatif d&apos;identité en cas de doute.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          introduire une réclamation auprès de la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          Les échanges avec le site sont chiffrés (HTTPS) et l&apos;accès aux
          données de commande est réservé à l&apos;équipe. Aucun système n&apos;est
          infaillible : en cas de violation de données susceptible de vous
          concerner, nous vous en informerons conformément à la loi.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

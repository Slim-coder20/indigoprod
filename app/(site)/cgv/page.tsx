import Link from "next/link";
import LegalPage, { LegalSection, Val } from "@/components/LegalPage";
import { CONTACT } from "@/lib/contact";
import { LEGAL } from "@/lib/legal";

export const metadata = { title: "Conditions générales de vente" };

export default function Cgv() {
  return (
    <LegalPage
      title="Conditions générales de vente"
      intro="Ces conditions s'appliquent à toutes les commandes passées sur la boutique en ligne du site indigoprod.fr par des consommateurs."
    >
      <LegalSection title="1. Vendeur">
        <p>
          Les produits sont vendus par{" "}
          <strong>
            <Val>{LEGAL.companyName}</Val>
          </strong>{" "}
          ({LEGAL.brand}), <Val>{LEGAL.legalForm}</Val>, SIRET{" "}
          <Val>{LEGAL.siret}</Val>, siège social : <Val>{LEGAL.address}</Val>.
          TVA : <Val>{LEGAL.vat}</Val>.
        </p>
        <p>
          Contact :{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> ·{" "}
          {CONTACT.phones.map((phone, i) => (
            <span key={phone.href}>
              {i > 0 && " · "}
              <a href={phone.href}>{phone.label}</a>
            </span>
          ))}
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Produits">
        <p>
          La boutique propose des supports physiques (vinyles, CD, livres-disques
          notamment) liés aux sorties des artistes. Chaque produit est présenté
          avec ses caractéristiques essentielles. Les photographies sont
          indicatives.
        </p>
        <p>
          Les produits sont proposés dans la limite des stocks disponibles. Un
          produit épuisé est signalé comme tel et ne peut pas être commandé.
        </p>
      </LegalSection>

      <LegalSection title="3. Prix">
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises lorsque la
          TVA est applicable (<Val>{LEGAL.vat}</Val>), hors frais de port. Les
          frais de port dépendent des produits commandés : ils sont calculés et
          affichés sur la page de paiement, avant la validation définitive de
          la commande.
        </p>
        <p>
          Le prix applicable est celui affiché au moment de la commande. Le
          vendeur peut modifier ses prix à tout moment, sans effet sur les
          commandes déjà passées.
        </p>
      </LegalSection>

      <LegalSection title="4. Commande">
        <p>
          Pour commander, vous ajoutez les produits à votre panier, vérifiez son
          contenu, puis cliquez sur « Payer ». Vous êtes redirigé vers la page de
          paiement sécurisée de notre prestataire Stripe, où vous renseignez
          votre adresse de livraison et vos moyens de paiement.
        </p>
        <p>
          La vente est conclue lorsque le paiement est confirmé et que la page
          « Commande confirmée » s&apos;affiche. Si un produit devient
          indisponible entre-temps, le vendeur vous en informe dans les
          meilleurs délais et vous rembourse la somme correspondante.
        </p>
      </LegalSection>

      <LegalSection title="5. Paiement">
        <p>
          Le paiement est exigible à la commande, par carte bancaire (ou par
          les portefeuilles électroniques proposés sur la page de paiement).
          Les transactions sont traitées par <strong>Stripe</strong>, qui
          assure la sécurité des paiements. Le vendeur n&apos;a jamais accès à
          vos données de carte bancaire.
        </p>
      </LegalSection>

      <LegalSection title="6. Livraison">
        <p>
          Les produits sont livrés en <strong>France</strong>, à
          l&apos;adresse que vous indiquez lors du paiement. Vous êtes
          responsable de l&apos;exactitude de cette adresse.
        </p>
        <ul>
          <li>
            Délai de livraison indicatif : <Val>{LEGAL.deliveryDelay}</Val>.
          </li>
          <li>
            Mode d&apos;expédition : <Val>{LEGAL.carrier}</Val>.
          </li>
        </ul>
        <p>
          En cas de retard de livraison, vous pouvez contacter le vendeur aux
          coordonnées ci-dessus. Les risques sont transférés à
          l&apos;acheteur à la réception du colis. Nous vous invitons à vérifier
          l&apos;état du colis à la livraison et, en cas de dommage, à émettre
          des réserves auprès du transporteur puis à nous prévenir.
        </p>
      </LegalSection>

      <LegalSection title="7. Droit de rétractation">
        <p>
          Conformément au Code de la consommation, vous disposez d&apos;un délai
          de <strong>14 jours</strong> à compter de la réception de votre
          commande pour vous rétracter, sans avoir à justifier de motif.
        </p>
        <p>
          Pour l&apos;exercer, informez-nous de votre décision de manière non
          équivoque (par exemple par email à{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>), en
          indiquant votre nom, votre numéro de commande et les produits
          concernés. Vous pouvez utiliser le modèle ci-dessous.
        </p>
        <p>
          Vous devez renvoyer les produits, dans leur état d&apos;origine et
          au plus tard 14 jours après nous avoir informés de votre décision, à
          l&apos;adresse suivante : <Val>{LEGAL.returnAddress}</Val>. Les frais
          de retour sont à votre charge.
        </p>
        <p>
          Nous vous remboursons la totalité des sommes versées, y compris les
          frais de livraison standard, au plus tard 14 jours après réception des
          produits retournés (ou après la preuve de leur expédition), par le même
          moyen de paiement que celui utilisé pour la commande.
        </p>
        <p>
          <strong>Exceptions.</strong> Conformément à l&apos;article L.221-28
          du Code de la consommation, le droit de rétractation ne peut pas être
          exercé pour les enregistrements audio ou vidéo scellés (vinyle, CD,
          livre-disque sous film) qui ont été descellés par le consommateur
          après la livraison.
        </p>
        <p className="rounded-lg border border-line bg-surface p-4">
          <strong>Modèle de formulaire de rétractation</strong>
          <br />
          À l&apos;attention de <Val>{LEGAL.companyName}</Val>,{" "}
          <Val>{LEGAL.address}</Val>, {CONTACT.email} :
          <br />
          Je vous notifie par la présente ma rétractation du contrat portant sur
          la vente du produit ci-dessous : …
          <br />
          Commandé le … / reçu le … — Numéro de commande : …
          <br />
          Nom du consommateur : … — Adresse du consommateur : …
          <br />
          Date et signature (uniquement en cas de notification sur papier) : …
        </p>
      </LegalSection>

      <LegalSection title="8. Garanties légales">
        <p>
          Le vendeur est tenu de la garantie légale de conformité (articles
          L.217-3 et suivants du Code de la consommation) et de la garantie des
          défauts de la chose vendue (articles 1641 et suivants du Code civil).
        </p>
        <p>
          En cas de produit défectueux ou non conforme (par exemple un disque
          rayé ou abîmé à la réception), contactez-nous avec votre numéro de
          commande et, si possible, des photographies : nous procéderons, selon
          le cas, à la réparation, au remplacement ou au remboursement du
          produit.
        </p>
      </LegalSection>

      <LegalSection title="9. Données personnelles">
        <p>
          Les données collectées pour traiter votre commande sont utilisées
          conformément à notre{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </LegalSection>

      <LegalSection title="10. Médiation et litiges">
        <p>
          En cas de litige, vous pouvez d&apos;abord contacter le vendeur pour
          trouver une solution amiable. Si le litige persiste, vous pouvez
          recourir gratuitement au médiateur de la consommation :{" "}
          <strong>
            <Val>{LEGAL.mediator.name}</Val>
          </strong>
          , <Val>{LEGAL.mediator.website}</Val>.
        </p>
        <p>
          Les présentes conditions sont soumises au droit français. À défaut de
          résolution amiable, les tribunaux compétents sont ceux déterminés par
          les règles applicables aux litiges de consommation.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

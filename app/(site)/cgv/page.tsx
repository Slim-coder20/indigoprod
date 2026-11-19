import Link from "next/link";
import LegalPage, { LegalSection, Val } from "@/components/LegalPage";
import { LEGAL } from "@/lib/legal";

export const metadata = { title: "Conditions générales de vente" };

const EMAIL = (
  <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
);

const TEL = (
  <a href="tel:+33615793945">06 15 79 39 45</a>
);

const ADRESSE_SIEGE = <Val>{LEGAL.address}</Val>;

export default function Cgv() {
  return (
    <LegalPage
      title="Conditions générales de vente"
      intro="Ces conditions s’appliquent à toutes les commandes passées sur la boutique en ligne du site indigoprod.fr par des consommateurs."
    >
      <LegalSection title="1. Identification du vendeur">
        <p>
          La boutique accessible sur <strong>indigoprod.fr</strong> est
          exploitée par{" "}
          <strong>
            <Val>{LEGAL.companyName}</Val>
          </strong>
          , <Val>{LEGAL.legalForm}</Val>.
        </p>
        <ul>
          <li>
            Siège social : {ADRESSE_SIEGE}
          </li>
          <li>
            RNA : W372020110
          </li>
          <li>
            SIREN : <Val>{LEGAL.siren}</Val>
          </li>
          <li>
            SIRET : <Val>{LEGAL.siret}</Val>
          </li>
        </ul>
        <p>
          Pour toute question concernant une commande, une livraison, un retour
          ou une réclamation : {EMAIL} — {TEL}.
        </p>
      </LegalSection>

      <LegalSection title="2. Objet et champ d’application">
        <p>
          Les présentes conditions générales de vente régissent les commandes de
          produits physiques passées sur la boutique par des consommateurs
          agissant pour leurs besoins personnels. Elles concernent les CD,
          disques vinyles et livres-disques proposés à la vente.
        </p>
        <p>
          Les conditions applicables sont celles portées à la connaissance du
          client au moment de sa commande. Une modification ultérieure ne
          s’applique pas aux commandes déjà conclues.
        </p>
      </LegalSection>

      <LegalSection title="3. Présentation et disponibilité des produits">
        <p>
          Les caractéristiques essentielles de chaque produit, notamment son
          titre, son artiste, son format et son prix, sont présentées sur sa
          fiche.
        </p>
        <p>
          Les produits sont proposés dans la limite des stocks disponibles.
          Lorsqu’un produit est proposé en précommande, cette situation et son
          délai de livraison sont précisés avant la commande.
        </p>
        <p>
          Si un produit devient indisponible après la commande, INDIGO PROD’ en
          informe rapidement le client. Aucun remplacement par un autre produit
          n’est imposé. Les sommes correspondant aux produits qui ne peuvent pas
          être fournis sont remboursées.
        </p>
      </LegalSection>

      <LegalSection title="4. Prix">
        <p>
          Les prix sont exprimés en euros. Le montant total à payer, comprenant
          le prix des produits et les éventuels frais de livraison, est
          communiqué avant la validation définitive de la commande.
        </p>
        <p>
          Les frais de livraison sont présentés distinctement et dépendent des
          modalités proposées pour la commande concernée.
        </p>
        <p>
          Le prix applicable est celui affiché lors de la validation de la
          commande. Le traitement de la TVA figure sur les documents de vente
          conformément au régime fiscal applicable à INDIGO PROD’ (
          <Val>{LEGAL.vat}</Val>).
        </p>
      </LegalSection>

      <LegalSection title="5. Passation de la commande">
        <p>
          Le client sélectionne les produits souhaités et les ajoute à son
          panier. Avant de confirmer sa commande, il peut vérifier les produits,
          les quantités, ses coordonnées, le mode de livraison et le prix total.
          Il peut corriger les erreurs de saisie avant la validation définitive.
        </p>
        <p>
          Le client prend connaissance des présentes conditions et les accepte
          avant de commander. La validation finale indique clairement que la
          commande entraîne une obligation de paiement.
        </p>
        <p>
          Une confirmation est adressée par courrier électronique. Le client doit
          pouvoir conserver les informations contractuelles et les conditions
          générales applicables à sa commande.
        </p>
      </LegalSection>

      <LegalSection title="6. Paiement">
        <p>
          Les moyens de paiement acceptés sont présentés au début du processus de
          commande. Le client choisit parmi les moyens effectivement proposés sur
          la boutique. Le montant à régler et les modalités de paiement lui sont
          présentés avant sa validation définitive.
        </p>
        <p>
          Un paiement refusé ou non abouti ne permet pas de poursuivre le
          traitement de la commande dans ces conditions. Le client en est
          informé.
        </p>
      </LegalSection>

      <LegalSection title="7. Préparation, expédition et livraison">
        <p>
          Les commandes sont livrées en <strong>France</strong>, dans les zones
          proposées au cours de la commande. Les restrictions territoriales sont
          indiquées avant sa validation.
        </p>
        <ul>
          <li>
            Délai de préparation : les produits en stock sont préparés et remis
            au transporteur sous 1 à 3 jours ouvrés après confirmation du
            paiement. Les jours ouvrés s’entendent du lundi au vendredi, hors
            jours fériés.
          </li>
          <li>
            Transporteur : <Val>{LEGAL.carrier}</Val>. Le délai de transport
            s’ajoute au délai de préparation. Le délai total indicatif :{" "}
            <Val>{LEGAL.deliveryDelay}</Val>.
          </li>
        </ul>
        <p>
          La date ou le délai total de livraison applicable est communiqué avant
          la validation de la commande. Les produits en précommande sont livrés
          selon le délai annoncé lors de leur achat.
        </p>
        <p>
          En cas de retard ou de difficulté, le client peut contacter INDIGO
          PROD’ à {EMAIL}. Il bénéficie des recours prévus par le Code de la
          consommation. Il peut notamment demander la livraison dans un délai
          supplémentaire raisonnable, puis mettre fin au contrat si la livraison
          n’intervient pas. Dans les situations prévues par la loi, il peut
          mettre fin immédiatement au contrat.
        </p>
        <p>
          Lorsque le contrat est résolu pour défaut de livraison, les sommes
          versées sont remboursées dans les quatorze jours suivant sa résolution.
        </p>
        <p>
          INDIGO PROD’ demeure responsable envers le client de la bonne exécution
          de la commande, y compris lorsque la livraison est confiée à un
          transporteur.
        </p>
      </LegalSection>

      <LegalSection title="8. Réception des produits">
        <p>
          Le client est invité à vérifier l’état du colis et des produits lors de
          leur réception.
        </p>
        <p>
          Toute erreur, détérioration ou anomalie peut être signalée à {EMAIL},
          en précisant le numéro de commande et la difficulté rencontrée. Des
          photographies peuvent faciliter le traitement de la demande.
        </p>
        <p>
          L’absence de réserves auprès du transporteur ne prive pas le client de
          ses garanties légales.
        </p>
        <p>
          Les risques de perte ou de détérioration sont transférés au client
          lorsqu’il prend physiquement possession des produits, sous réserve des
          exceptions légales.
        </p>
      </LegalSection>

      <LegalSection title="9. Droit de rétractation">
        <p>
          Sauf exception légale, le client dispose de quatorze jours pour
          notifier sa décision de se rétracter, sans avoir à la justifier.
        </p>
        <p>
          Pour les produits physiques, ce délai commence le lendemain de leur
          réception par le client ou un tiers désigné par lui, autre que le
          transporteur. Pour plusieurs produits commandés ensemble et livrés
          séparément, il commence le lendemain de la réception du dernier
          produit.
        </p>
        <p>
          Lorsque le délai expire un samedi, un dimanche ou un jour férié ou
          chômé, il est prolongé jusqu’au premier jour ouvrable suivant.
        </p>
        <p>
          Le client peut notifier sa décision par courrier électronique à{" "}
          {EMAIL} ou par courrier à INDIGO PROD’, {ADRESSE_SIEGE}.
        </p>
        <p>
          Il peut utiliser le formulaire figurant à la fin des présentes
          conditions ou toute déclaration exprimant clairement sa volonté de se
          rétracter. Le simple renvoi du produit ou le refus du colis ne suffit
          pas, à lui seul, à notifier une rétractation.
        </p>
      </LegalSection>

      <LegalSection title="10. Exception concernant les enregistrements audio descellés">
        <p>
          Conformément à l’article L. 221-28 du Code de la consommation, le droit
          de rétractation ne s’applique pas aux enregistrements audio livrés
          scellés puis descellés par le client après leur réception.
        </p>
        <p>
          Cette exception concerne les produits et conditionnements répondant
          effectivement aux conditions légales. Elle ne peut pas être appliquée
          automatiquement à tous les livres ou livres-disques.
        </p>
        <p>
          Elle ne supprime jamais les garanties légales en cas de défaut du
          produit.
        </p>
      </LegalSection>

      <LegalSection title="11. Retour des produits après rétractation">
        <p>
          Après notification de sa rétractation, le client renvoie les produits
          sans retard excessif et au plus tard dans les quatorze jours suivants
          à :
        </p>
        <p>
          INDIGO PROD’
          <br />
          <Val>{LEGAL.returnAddress}</Val>
        </p>
        <p>
          Les produits doivent être accompagnés de leurs accessoires éventuels et
          protégés de manière adaptée au transport.
        </p>
        <p>
          Les frais directs de retour liés à une rétractation sont à la charge du
          client. Cette règle ne concerne pas les frais que le vendeur doit
          prendre en charge au titre des garanties légales ou d’une erreur qui
          lui est imputable.
        </p>
        <p>
          Le client n’est responsable que de la dépréciation causée par des
          manipulations allant au-delà de celles nécessaires pour vérifier la
          nature, les caractéristiques et le bon fonctionnement des produits.
        </p>
        <p>
          Il est recommandé de conserver une preuve de l’expédition du retour.
        </p>
      </LegalSection>

      <LegalSection title="12. Remboursement après rétractation">
        <p>
          En cas de rétractation portant sur l’ensemble de la commande, INDIGO
          PROD’ rembourse les sommes reçues, y compris les frais de livraison
          standard initiaux. Le supplément correspondant au choix d’une livraison
          plus coûteuse que la livraison standard proposée n’est pas remboursé.
        </p>
        <p>
          Le remboursement intervient sans retard injustifié et au plus tard dans
          les quatorze jours suivant la notification de la rétractation. Il peut
          être différé jusqu’à la récupération des produits ou la réception d’une
          preuve de leur expédition, selon le premier de ces événements.
        </p>
        <p>
          Le même moyen de paiement est utilisé, sauf accord exprès du client pour
          un autre moyen, sans frais pour lui.
        </p>
      </LegalSection>

      <LegalSection title="13. Garanties légales">
        <p>
          INDIGO PROD’ répond des garanties légales applicables aux produits
          vendus. Le client peut solliciter leur mise en œuvre à {EMAIL}, au{" "}
          {TEL} ou au siège de l’association.
        </p>
        <p>
          La garantie légale de conformité protège le client contre les défauts
          apparaissant dans les deux ans suivant la délivrance d’un bien neuf.
          Pendant cette période, il n’a pas à démontrer que le défaut existait
          déjà lors de la livraison.
        </p>
        <p>
          Dans les conditions légales, le client peut obtenir gratuitement
          réparation ou remplacement, sous trente jours et sans inconvénient
          majeur. Une réduction du prix ou la résolution de la vente est possible
          notamment en cas de refus, de retard, d’échec de la mise en conformité
          ou de défaut suffisamment grave. Un défaut mineur ne permet pas la
          résolution.
        </p>
        <p>
          La garantie est suspendue pendant l’immobilisation pour réparation ou
          remplacement. Une réparation prolonge la garantie initiale de six mois.
          Si le client demande une réparation mais que le vendeur impose un
          remplacement, une nouvelle garantie de deux ans commence à la livraison
          du bien remplacé.
        </p>
        <p>
          La garantie des vices cachés permet également d’agir dans les deux ans
          suivant la découverte du défaut, pour demander une réduction du prix ou
          restituer le produit contre remboursement.
        </p>
      </LegalSection>

      <LegalSection title="14. Réclamations et règlement des litiges">
        <p>
          Toute réclamation peut être adressée à {EMAIL} ou au siège d’INDIGO
          PROD’, en indiquant les références de la commande et l’objet de la
          demande.
        </p>
        <p>
          INDIGO PROD’ recherche une solution amiable avec le client.
        </p>
        <p>
          Le client conserve ses droits de recours, notamment le droit de recourir
          à la médiation de la consommation dans les conditions légales et celui de
          saisir la juridiction compétente.
        </p>
      </LegalSection>

      <LegalSection title="15. Données personnelles">
        <p>
          Les données nécessaires à la commande sont utilisées pour son
          traitement, le paiement, la livraison, le suivi des demandes et le
          respect des obligations légales.
        </p>
        <p>
          Les informations sur les traitements, leurs destinataires, les durées de
          conservation et les droits des personnes figurent dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link> du
          site. Les demandes concernant les données personnelles peuvent être
          adressées à {EMAIL}.
        </p>
      </LegalSection>

      <LegalSection title="16. Conservation des documents et droit applicable">
        <p>
          Le client est invité à conserver la confirmation de commande et les
          présentes conditions.
        </p>
        <p>
          INDIGO PROD’ conserve les documents contractuels conformément à ses
          obligations légales. Le client peut demander l’accès aux documents le
          concernant à {EMAIL}.
        </p>
        <p>
          Les présentes conditions sont rédigées en français et soumises au droit
          français, sans priver le consommateur des dispositions impératives qui
          lui sont applicables. En cas de litige, les règles légales de compétence
          s’appliquent.
        </p>
      </LegalSection>

      <LegalSection title="Annexe — Formulaire de rétractation">
        <p>À utiliser uniquement si vous souhaitez vous rétracter de votre commande.</p>
        <p className="rounded-lg border border-line bg-surface p-4">
          À l’attention d’INDIGO PROD’, {ADRESSE_SIEGE} — {EMAIL}
          <br />
          <br />
          Je vous notifie ma rétractation du contrat portant sur la vente des
          produits suivants :
          <br />
          Produit ou produits concernés : …
          <br />
          Numéro de commande : …
          <br />
          Date de commande : …
          <br />
          Date de réception : …
          <br />
          Nom et prénom du consommateur : …
          <br />
          Adresse du consommateur : …
          <br />
          Date : …
          <br />
          Signature du consommateur, uniquement en cas d’envoi sur papier : …
        </p>
      </LegalSection>
    </LegalPage>
  );
}

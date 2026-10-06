# IndigoProduction

Site vitrine et boutique en ligne d'**IndigoProduction**, une maison de
production musicale indépendante basée à Tours (Indigo Prod pour le spectacle
vivant, Indigo Records pour la production phonographique).

- Production : <https://indigoprod.fr>
- Dépôt : <https://github.com/Slim-coder20/indigoprod>

## Sommaire

1. [Fonctionnalités](#fonctionnalités)
2. [Technologies utilisées](#technologies-utilisées)
3. [Services et API consommés](#services-et-api-consommés)
4. [Architecture du projet](#architecture-du-projet)
5. [Variables d'environnement](#variables-denvironnement)
6. [Installation et développement local](#installation-et-développement-local)
7. [Base de données](#base-de-données)
8. [Paiement et commandes](#paiement-et-commandes)
9. [Espace d'administration](#espace-dadministration)
10. [Déploiement](#déploiement)
11. [Pages légales](#pages-légales)

## Fonctionnalités

**Site public**

- Accueil, À propos, Artistes (fiche détaillée par artiste), Concerts,
  Contact (formulaire envoyé par email).
- **Boutique** : sorties (albums, singles) et leurs éditions physiques
  (vinyle, CD, livre-disque), panier, paiement par carte via Stripe,
  page de confirmation.
- Pages légales : mentions légales, CGV, politique de confidentialité.

**Espace admin** (`/admin`, accès restreint)

- Gestion des artistes, des concerts, de la boutique (sorties, produits,
  stock, prix, frais de port) et envoi de médias (images, vidéo).
- Liste des **commandes** avec adresse de livraison et filtres par statut.
- Tableau de bord : compteurs, prochains concerts, alertes de stock bas.

## Technologies utilisées

| Domaine | Technologie |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Server Components, Server Actions) |
| UI | [React](https://react.dev) 19, [Tailwind CSS](https://tailwindcss.com) 4 |
| Langage | [TypeScript](https://www.typescriptlang.org) 5 (mode strict) |
| Base de données | PostgreSQL hébergé par [Supabase](https://supabase.com) |
| ORM | [Prisma](https://www.prisma.io) 7 avec l'adaptateur `@prisma/adapter-pg` |
| Validation | [Zod](https://zod.dev) 4 (formulaires, panier, server actions) |
| Paiement | [Stripe](https://stripe.com) (Checkout + webhooks), SDK `stripe` 23 |
| Emails | [Resend](https://resend.com) (formulaire de contact) |
| Authentification admin | Supabase Auth (`@supabase/ssr`) |
| Stockage des médias | Supabase Storage (bucket public `media`) |
| Qualité | ESLint 9 (`eslint-config-next`) |
| Hébergement | [Vercel](https://vercel.com) |

> Cette version de Next.js a des changements incompatibles avec les versions
> précédentes (ex. `middleware.ts` devient `proxy.ts`, `params` et
> `searchParams` sont des `Promise`). Voir [`AGENTS.md`](AGENTS.md) et
> `node_modules/next/dist/docs/` avant d'écrire du code de routing.

## Services et API consommés

### Stripe

| Usage | Appel | Où |
| --- | --- | --- |
| Créer une session de paiement | `stripe.checkout.sessions.create` (mode `payment`, devise `eur`, `shipping_address_collection` France, `shipping_options` pour les frais de port) | `app/(site)/panier/actions.ts` |
| Vérifier le paiement après redirection | `stripe.checkout.sessions.retrieve` | `app/(site)/boutique/succes/page.tsx` |
| Recevoir les événements de paiement | Webhook `POST /api/stripe/webhook`, signature vérifiée avec `stripe.webhooks.constructEvent` | `app/api/stripe/webhook/route.ts` |

Événements traités : `checkout.session.completed` (commande payée, stock
décrémenté, adresse enregistrée) et `checkout.session.expired` (commande
annulée). En production, la clé secrète est une **clé restreinte** limitée à
la ressource *Checkout Sessions*.

### Supabase

| Usage | Détail |
| --- | --- |
| PostgreSQL | Accès via Prisma. `DATABASE_URL` : pooler en mode Transaction (port 6543) pour le site ; `DIRECT_URL` : pooler en mode Session (port 5432) pour les migrations et le seed |
| Auth | `signInWithPassword` pour la connexion à l'admin, `getClaims` pour lire la session (`lib/admin/auth.ts`, `proxy.ts`) |
| Storage | Envoi des médias par **URL signée** générée côté serveur avec la clé secrète (`createSignedUploadUrl`) ; lecture publique du bucket `media` |

### Resend

`resend.emails.send` : envoi des messages du formulaire de contact
(`app/(site)/contact/actions.ts`). L'expéditeur doit appartenir à un domaine
vérifié dans Resend (SPF/DKIM).

### Liens externes

Les écoutes (Spotify) et les réseaux sociaux (Instagram, Facebook) sont de
simples liens, sans appel d'API.

## Architecture du projet

```
app/
  (site)/            Pages publiques (accueil, artistes, boutique, panier,
                     concerts, contact, pages légales)
  admin/             Espace d'administration (connexion + tableau de bord)
  api/stripe/webhook Réception des événements Stripe
components/          Composants React (site) ; components/admin pour l'admin
lib/
  prisma.ts          Client Prisma (adaptateur pg)
  stripe.ts          Client Stripe (serveur uniquement)
  orders.ts          Traitement des commandes (webhook)
  cart.ts            Panier côté navigateur (localStorage)
  queries/           Lectures en base, mises en cache
  admin/             Auth admin, formulaires, médias, slugs
  data/              Données de départ du seed
  legal.ts           Informations légales de l'entreprise
prisma/
  schema.prisma      Schéma de la base
  migrations/        Migrations SQL versionnées
  seed.ts            Remplissage initial (idempotent)
proxy.ts             Protège /admin (redirige vers la connexion)
```

Points techniques :

- Les lectures du catalogue sont mises en cache (`unstable_cache`, tag
  `releases`) puis invalidées après chaque modification ou vente.
- Le panier vit dans le navigateur. Le serveur **relit prix, stock et frais de
  port en base** à chaque paiement : les valeurs envoyées par le client ne sont
  jamais crues.
- Le traitement du webhook est **idempotent** : un événement reçu deux fois ne
  décrémente le stock qu'une fois.

## Variables d'environnement

Copier `.env.example` vers `.env` puis renseigner les valeurs. Ne jamais
commiter `.env` (ignoré par git).

| Variable | Rôle |
| --- | --- |
| `DATABASE_URL` | Connexion Supabase via pooler Transaction (site) |
| `DIRECT_URL` | Connexion Supabase via pooler Session (migrations, seed) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clé publique Supabase (Auth) |
| `SUPABASE_SECRET_KEY` | Clé secrète Supabase, **serveur uniquement** (URLs signées de Storage) |
| `ADMIN_EMAIL` | Email(s) autorisé(s) à entrer dans l'admin, séparés par des virgules |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (`sk_test_`/`rk_test_` en test, `sk_live_`/`rk_live_` en production) |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature du webhook (`whsec_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe (facultative : non lue dans le code actuel) |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site, sans `/` final (URLs de retour de Stripe) |
| `RESEND_API_KEY` | Clé API Resend |
| `CONTACT_TO_EMAIL` | Destinataire des messages du formulaire de contact |
| `CONTACT_FROM_EMAIL` | Expéditeur (domaine vérifié dans Resend) |

## Installation et développement local

Prérequis : Node.js 20 ou plus, un projet Supabase, des clés Stripe en **mode
test**.

```bash
npm install                  # installe aussi le client Prisma (postinstall)
cp .env.example .env         # puis renseigner les variables
npm run db:deploy            # applique les migrations
npm run db:seed              # remplit le catalogue (artistes, sorties, concerts)
npm run dev                  # http://localhost:3000
```

Pour tester le paiement en local, le webhook doit être relayé par la CLI Stripe
(dans un second terminal). Le `whsec_...` affiché va dans `STRIPE_WEBHOOK_SECRET` :

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Carte de test : `4242 4242 4242 4242`, date future, CVC quelconque.

> Attention : si `DATABASE_URL` pointe vers la base de production, les tests
> locaux écrivent dans la vraie base. Utiliser une base de développement
> séparée si possible.

### Scripts

| Commande | Action |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et lancement en production |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Crée et applique une migration (développement) |
| `npm run db:deploy` | Applique les migrations existantes (production) |
| `npm run db:generate` | Régénère le client Prisma |
| `npm run db:seed` | Remplit la base (relançable sans doublon) |
| `npm run db:studio` | Interface Prisma Studio |

## Base de données

Modèles principaux (`prisma/schema.prisma`) :

- **Artist**, **Album**, **Concert** : catalogue artistique.
- **Product** : édition vendue d'une sortie (prix, stock, `shippingCents` =
  frais de port, `active`).
- **Order** / **OrderItem** : commandes, avec statut (`PENDING`, `PAID`,
  `CANCELLED`, `REFUNDED`), total, frais de port, client et adresse de
  livraison.

Les montants sont stockés en **centimes**. Toute modification du schéma passe
par une migration versionnée dans `prisma/migrations/`.

## Paiement et commandes

1. Le client remplit son panier (navigateur) puis clique sur **Payer**.
2. Une server action valide le panier (Zod), relit prix et stock en base, crée
   la commande `PENDING` et une session Stripe Checkout.
3. **Frais de port** : chaque produit a ses frais. Un seul colis par commande,
   donc le tarif le plus élevé du panier s'applique.
4. Le client paie sur la page Stripe (et y saisit son adresse, France
   uniquement).
5. Stripe appelle le webhook : la commande passe à `PAID`, le stock est
   décrémenté et l'adresse enregistrée. Une session expirée annule la commande.
6. La commande apparaît dans **Admin → Commandes**.

## Espace d'administration

- Accès : `/admin`, connexion par email et mot de passe (Supabase Auth).
- Seuls les emails de `ADMIN_EMAIL` sont admis. `proxy.ts` redirige les
  visiteurs non connectés, et chaque page et chaque server action rappelle
  `requireAdmin()`.
- Les médias sont envoyés directement du navigateur vers Supabase Storage par
  URL signée (images JPG/PNG/WebP jusqu'à 5 Mo, vidéos MP4 jusqu'à 50 Mo).

## Déploiement

Le site est déployé sur **Vercel**.

| Élément | Détail |
| --- | --- |
| Déclencheur | Chaque push sur la branche `main` du dépôt GitHub déclenche un déploiement de production |
| Région | `fra1` (Francfort), définie dans `vercel.json` |
| Build | `next build` ; `prisma generate` est lancé automatiquement par `postinstall` |
| Domaine | `indigoprod.fr` et `www.indigoprod.fr`, DNS gérés chez IONOS (enregistrement A vers l'IP Vercel, CNAME pour `www`) |
| Variables | Saisies dans Vercel → Settings → Environment Variables |

### Variables Vercel

- **Production** : clés Stripe **live**, `NEXT_PUBLIC_SITE_URL=https://indigoprod.fr`
  et toutes les variables du tableau ci-dessus.
- **Preview / Development** : clés Stripe de **test**, pour qu'une branche de
  test n'encaisse jamais de vrai paiement.
- Les variables sont figées à chaque déploiement : après toute modification,
  **redéployer**.

### Mise en production d'une évolution

1. Si le schéma Prisma a changé : appliquer la migration **avant** le push
   (`npm run db:deploy`). Elle doit être rétrocompatible (ajout de colonnes avec
   valeur par défaut), car l'ancien code tourne encore pendant le déploiement.
2. `git push origin main`, puis attendre le statut « Ready » dans Vercel.
3. Vérifier le site et le webhook (une requête `POST` sans signature sur
   `/api/stripe/webhook` doit répondre `400`).

### Configuration Stripe en production

- Destination webhook (Développeurs → Webhooks) :
  `https://indigoprod.fr/api/stripe/webhook`, événements
  `checkout.session.completed` et `checkout.session.expired`.
- Moyens de paiement activés dans Paramètres → Moyens de paiement : la carte
  bancaire est indispensable (sans elle, la création de session échoue avec
  « No valid payment method types »). Éviter les moyens de paiement différés
  (prélèvement SEPA, virement) : le code ne valide une commande que si
  `payment_status` vaut `paid`.
- Test réel après activation : petit achat avec une vraie carte, vérification
  de la commande dans l'admin, puis remboursement depuis Stripe.

## Pages légales

`/mentions-legales`, `/cgv` et `/confidentialite` sont liées dans le footer.
Les informations de l'entreprise (raison sociale, SIRET, adresse, TVA,
livraison, médiateur…) sont centralisées dans [`lib/legal.ts`](lib/legal.ts) ;
les valeurs « À COMPLÉTER » s'affichent en surbrillance jusqu'à leur
renseignement. Ces textes sont des modèles à faire relire avant usage.

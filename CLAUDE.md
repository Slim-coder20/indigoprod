@AGENTS.md

# IndigoProduction — feuille de route

Site vitrine et boutique en ligne pour IndigoProduction, une maison de
production musicale. Stack : Next.js (App Router) + Tailwind CSS pour l'UI,
PostgreSQL pour les données, Stripe pour les paiements.

## Navigation du site

Accueil (`/`) · À propos (`/about`) · Artistes (`/artistes`) ·
Boutique (`/boutique`) · Concerts (`/concerts`) · Contact (`/contact`).

## Modèle de données prévu — table `product`

| Champ           | Description                          |
| ---------------- | ------------------------------------- |
| `artist_name`     | Nom de l'artiste                      |
| `album_title`     | Titre de l'album                      |
| `release_date`    | Date de sortie                        |
| `price`           | Prix de vente                         |
| `stock`           | Stock initial                         |
| `stock_restant`   | Stock restant disponible à la vente   |

Le type TypeScript correspondant (`Album`) est déjà défini dans
`lib/data/albums.ts`, alimenté pour l'instant par des données statiques.

## Étapes du projet

1. **Mise en place des pages et de la navigation** ✅
   Layout, Navbar/Footer, et les 6 pages (Accueil, À propos, Artistes,
   Boutique, Concerts, Contact) avec des données statiques (`lib/data/`)
   qui préfigurent le futur schéma de base de données.

2. **Connexion PostgreSQL**
   Choisir l'accès DB (ex. Prisma ou un client `pg` léger), définir le
   schéma de la table `product` (voir ci-dessus), migrations, et
   remplacer les données statiques de la Boutique par une requête DB.

3. **API / gestion des produits**
   Route handlers (`app/api/.../route.ts`) pour lister les albums et
   décrémenter le stock restant lors d'une vente.

4. **Intégration Stripe**
   Paiement des albums depuis la Boutique (Stripe Checkout ou Elements),
   webhook Stripe pour confirmer la vente et mettre à jour `stock_restant`.

5. **Pages Artistes / Concerts dynamiques**
   Si besoin, migrer `lib/data/artists.ts` et `lib/data/concerts.ts` vers
   la base de données (tables dédiées).

6. **Déploiement**
   Variables d'environnement (DB, clés Stripe), build de production.

   Checklist avant la mise en ligne :
   - [ ] **Resend — vérifier le domaine** du site (resend.com > Domains >
     Add Domain) et ajouter chez l'hébergeur DNS les enregistrements
     SPF/DKIM indiqués. Possible avant le déploiement : seul l'accès DNS
     est nécessaire.
   - [ ] **Resend — `CONTACT_FROM_EMAIL`** : adresse du domaine vérifié,
     ex. `"Site Indigo <contact@indigoprod.fr>"` (sinon
     `onboarding@resend.dev`, qui n'envoie qu'à l'email du compte Resend).
   - [ ] **Resend — `CONTACT_TO_EMAIL`** : remettre
     `"contact.indigoprod@gmail.com"` (en dev il pointe vers
     `slimdev20@gmail.com`, l'email du compte Resend).
   - [ ] Reporter sur l'hébergeur toutes les variables de `.env.example`
     (`DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY`, `CONTACT_*`).

## Notes techniques

- Ce projet utilise une version de Next.js avec des breaking changes par
  rapport aux conventions habituelles — voir `AGENTS.md` et
  `node_modules/next/dist/docs/` avant d'écrire du code impliquant des
  routes dynamiques, du middleware, ou des API de routing.
- `params`/`searchParams` sont des `Promise` dans les pages/layouts qui en
  ont (routes dynamiques à venir, ex. `/artistes/[slug]`).
- `middleware.ts` est renommé `proxy.ts` dans cette version.

## données textuel a intégrer dans le site 

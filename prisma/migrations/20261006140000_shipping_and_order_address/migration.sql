-- AlterTable
ALTER TABLE "products" ADD COLUMN     "shippingCents" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shippingCents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shippingCity" TEXT,
ADD COLUMN     "shippingCountry" TEXT,
ADD COLUMN     "shippingLine1" TEXT,
ADD COLUMN     "shippingLine2" TEXT,
ADD COLUMN     "shippingName" TEXT,
ADD COLUMN     "shippingPostalCode" TEXT;

-- Frais de port actuels (modifiables ensuite depuis l'admin, fiche produit) :
-- Slim Abida (Asymétrie, Fréquences Basses) : 4 €, Da Silva : 8 €.
UPDATE "products" SET "shippingCents" = 400
WHERE "albumId" IN (
  SELECT "id" FROM "albums"
  WHERE "slug" IN ('slim-abida-asymetrie', 'slim-abida-frequences-basses')
);

UPDATE "products" SET "shippingCents" = 800
WHERE "albumId" IN (
  SELECT a."id" FROM "albums" a
  JOIN "artists" ar ON ar."id" = a."artistId"
  WHERE ar."slug" = 'da-silva'
);

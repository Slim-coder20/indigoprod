-- AlterTable
ALTER TABLE "albums" ALTER COLUMN "releaseDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");


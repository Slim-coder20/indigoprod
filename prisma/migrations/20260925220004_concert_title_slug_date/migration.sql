-- AlterTable
ALTER TABLE "concerts" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "concerts_slug_key" ON "concerts"("slug");


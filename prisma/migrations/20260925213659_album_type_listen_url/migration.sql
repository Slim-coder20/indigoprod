-- CreateEnum
CREATE TYPE "AlbumType" AS ENUM ('ALBUM', 'SINGLE');

-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "listenUrl" TEXT,
ADD COLUMN     "type" "AlbumType" NOT NULL DEFAULT 'ALBUM';

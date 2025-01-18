/*
  Warnings:

  - Added the required column `stanId` to the `Diskon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diskon" ADD COLUMN     "stanId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Diskon" ADD CONSTRAINT "Diskon_stanId_fkey" FOREIGN KEY ("stanId") REFERENCES "Stan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

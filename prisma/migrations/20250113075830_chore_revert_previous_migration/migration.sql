/*
  Warnings:

  - Made the column `transaksiId` on table `DetailTransaksi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DetailTransaksi" ALTER COLUMN "transaksiId" SET NOT NULL;

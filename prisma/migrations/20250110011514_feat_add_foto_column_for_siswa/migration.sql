/*
  Warnings:

  - Added the required column `foto` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "foto" TEXT NOT NULL;

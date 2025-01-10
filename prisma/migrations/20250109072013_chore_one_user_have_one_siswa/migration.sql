/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Siswa_userId_key" ON "Siswa"("userId");

-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_stanId_fkey";

-- DropForeignKey
ALTER TABLE "MenuDiskon" DROP CONSTRAINT "MenuDiskon_diskonId_fkey";

-- DropForeignKey
ALTER TABLE "MenuDiskon" DROP CONSTRAINT "MenuDiskon_menuId_fkey";

-- DropForeignKey
ALTER TABLE "Siswa" DROP CONSTRAINT "Siswa_userId_fkey";

-- DropForeignKey
ALTER TABLE "Stan" DROP CONSTRAINT "Stan_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_siswaId_fkey";

-- DropForeignKey
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_stanId_fkey";

-- AlterTable
ALTER TABLE "Transaksi" ALTER COLUMN "stanId" DROP NOT NULL,
ALTER COLUMN "siswaId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "DetailTransaksi" (
    "id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "hargaBeli" INTEGER NOT NULL,
    "transaksiId" TEXT NOT NULL,
    "menuId" TEXT,

    CONSTRAINT "DetailTransaksi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stan" ADD CONSTRAINT "Stan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_stanId_fkey" FOREIGN KEY ("stanId") REFERENCES "Stan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuDiskon" ADD CONSTRAINT "MenuDiskon_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuDiskon" ADD CONSTRAINT "MenuDiskon_diskonId_fkey" FOREIGN KEY ("diskonId") REFERENCES "Diskon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_stanId_fkey" FOREIGN KEY ("stanId") REFERENCES "Stan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaksi" ADD CONSTRAINT "DetailTransaksi_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "Transaksi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaksi" ADD CONSTRAINT "DetailTransaksi_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

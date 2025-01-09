-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'siswa');

-- CreateEnum
CREATE TYPE "Jenis" AS ENUM ('makanan', 'minuman');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('belumDikonfirmasi', 'dimasak', 'diantar', 'sampai');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Siswa" (
    "id" TEXT NOT NULL,
    "namaSiswa" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "telp" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stan" (
    "id" TEXT NOT NULL,
    "namaStan" TEXT NOT NULL,
    "namaPemilik" TEXT NOT NULL,
    "telp" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Stan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "namaMakanan" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "jenis" "Jenis" NOT NULL,
    "foto" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "stanId" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuDiskon" (
    "id" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "diskonId" TEXT NOT NULL,

    CONSTRAINT "MenuDiskon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diskon" (
    "id" TEXT NOT NULL,
    "namaDiskon" TEXT NOT NULL,
    "presentaseDiskon" INTEGER NOT NULL,
    "tanggalAwal" TIMESTAMP(3) NOT NULL,
    "tanggalAkhir" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diskon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "stanId" TEXT NOT NULL,
    "siswaId" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stan" ADD CONSTRAINT "Stan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_stanId_fkey" FOREIGN KEY ("stanId") REFERENCES "Stan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuDiskon" ADD CONSTRAINT "MenuDiskon_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuDiskon" ADD CONSTRAINT "MenuDiskon_diskonId_fkey" FOREIGN KEY ("diskonId") REFERENCES "Diskon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_stanId_fkey" FOREIGN KEY ("stanId") REFERENCES "Stan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

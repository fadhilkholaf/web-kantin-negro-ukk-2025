import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

export const createTransaksi = async (data: Prisma.TransaksiCreateInput) => {
  return await prisma.transaksi.create({ data });
};

export const findTransaksi = async (
  where: Prisma.TransaksiWhereUniqueInput,
  include?: Prisma.TransaksiInclude,
) => {
  return await prisma.transaksi.findUnique({ where, include });
};

export const findManyTransaksi = async (
  where?: Prisma.TransaksiWhereInput,
  include?: Prisma.TransaksiInclude,
  orderBy?: Prisma.TransaksiOrderByWithRelationInput,
) => {
  return await prisma.transaksi.findMany({
    where,
    include,
    orderBy,
  });
};

export const updateTransaksi = async (
  where: Prisma.TransaksiWhereUniqueInput,
  data: Prisma.TransaksiUpdateInput,
) => {
  return await prisma.transaksi.update({ where, data });
};

export const deleteTransaksi = async (
  where: Prisma.TransaksiWhereUniqueInput,
) => {
  return await prisma.transaksi.delete({ where });
};

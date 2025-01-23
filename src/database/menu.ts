import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createMenu = async (data: Prisma.MenuCreateInput) => {
  return await prisma.menu.create({ data });
};

export const findMenu = async (
  where: Prisma.MenuWhereUniqueInput,
  include?: Prisma.MenuInclude,
) => {
  return await prisma.menu.findUnique({ where, include });
};

export const findManyMenus = async (
  where?: Prisma.MenuWhereInput,
  include?: Prisma.MenuInclude,
) => {
  return await prisma.menu.findMany({ where, include });
};

const today = new Date();
const lastMonth = new Date();

today.setUTCHours(23, 59, 59, 999);

lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth.setUTCHours(0, 0, 0, 0);

export const findManyTopMenu = async () => {
  return await prisma.detailTransaksi.groupBy({
    by: "menuId",
    _sum: { qty: true },
    orderBy: { _sum: { qty: "desc" } },
    where: {
      transaksi: {
        tanggal: {
          gte: lastMonth,
          lte: today,
        },
      },
    },
  });
};

export const updateMenu = async (
  where: Prisma.MenuWhereUniqueInput,
  data: Prisma.MenuUpdateInput,
) => {
  return await prisma.menu.update({ where, data });
};

export const deleteMenu = async (where: Prisma.MenuWhereUniqueInput) => {
  return await prisma.menu.delete({ where });
};

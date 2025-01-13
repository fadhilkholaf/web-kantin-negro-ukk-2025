import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createMenu = async (data: Prisma.MenuCreateInput) => {
  return await prisma.menu.create({ data });
};

export const findMenu = async (where: Prisma.MenuWhereUniqueInput) => {
  return await prisma.menu.findUnique({ where });
};

export const findManyMenus = async (where: Prisma.MenuWhereInput) => {
  return await prisma.menu.findMany({ where });
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

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

export const updateMenu = async (
  where: Prisma.MenuWhereUniqueInput,
  data: Prisma.MenuUpdateInput,
) => {
  return await prisma.menu.update({ where, data });
};

export const deleteMenu = async (where: Prisma.MenuWhereUniqueInput) => {
  return await prisma.menu.delete({ where });
};

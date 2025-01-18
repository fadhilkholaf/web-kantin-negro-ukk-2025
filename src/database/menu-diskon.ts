import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createMenuDiskon = async (data: Prisma.MenuDiskonCreateInput) => {
  return await prisma.menuDiskon.create({ data });
};

export const findManyMenuDiskon = async (
  where?: Prisma.MenuDiskonWhereInput,
  include?: Prisma.MenuDiskonInclude,
) => {
  return await prisma.menuDiskon.findMany({ where, include });
};

export const deleteMenuDiskon = async (
  where: Prisma.MenuDiskonWhereUniqueInput,
) => {
  return await prisma.menuDiskon.delete({ where });
};

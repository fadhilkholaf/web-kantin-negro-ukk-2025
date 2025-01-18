import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createDiskon = async (data: Prisma.DiskonCreateInput) => {
  return await prisma.diskon.create({ data });
};

export const findDiskon = async (where: Prisma.DiskonWhereUniqueInput) => {
  return await prisma.diskon.findUnique({ where });
};

export const findManyDiskon = async (where: Prisma.DiskonWhereInput) => {
  return await prisma.diskon.findMany({ where });
};

export const updateDiskon = async (
  where: Prisma.DiskonWhereUniqueInput,
  data: Prisma.DiskonUpdateInput,
) => {
  return await prisma.diskon.update({ where, data });
};

export const deleteDiskon = async (where: Prisma.DiskonWhereUniqueInput) => {
  return await prisma.diskon.delete({ where });
};

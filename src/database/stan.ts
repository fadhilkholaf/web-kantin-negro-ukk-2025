import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createStan = async (data: Prisma.StanCreateInput) => {
  return await prisma.stan.create({ data });
};

export const findStan = async (where: Prisma.StanWhereUniqueInput) => {
  return await prisma.stan.findUnique({ where });
};

export const updateStan = async (
  where: Prisma.StanWhereUniqueInput,
  data: Prisma.StanUpdateInput,
) => {
  return await prisma.stan.update({ where, data });
};

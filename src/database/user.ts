import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({ data });
};

export const findUser = async (where: Prisma.UserWhereUniqueInput) => {
  return await prisma.user.findUnique({ where });
};

export const findUserProfile = async (where: Prisma.UserWhereUniqueInput) => {
  return await prisma.user.findUnique({
    where,
    include: { siswa: true, stan: true },
  });
};

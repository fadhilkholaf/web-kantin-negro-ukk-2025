import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({ data });
};

export const findUser = async (
  where: Prisma.UserWhereUniqueInput,
  include?: Prisma.UserInclude,
) => {
  return await prisma.user.findUnique({ where, include });
};

export const findManyUsers = async (where?: Prisma.UserWhereInput) => {
  return await prisma.user.findMany({ where });
};

export const findUserProfile = async (where: Prisma.UserWhereUniqueInput) => {
  return await prisma.user.findUnique({
    where,
    include: { siswa: true, stan: true },
  });
};

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
) => {
  return await prisma.user.update({ where, data });
};

export const deleteUser = async (where: Prisma.UserWhereUniqueInput) => {
  return await prisma.user.delete({ where });
};

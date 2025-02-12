import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

export const createSiswa = async (data: Prisma.SiswaCreateInput) => {
  return await prisma.siswa.create({ data });
};

export const findSiswa = async (
  where: Prisma.SiswaWhereUniqueInput,
  include?: Prisma.SiswaInclude,
) => {
  return await prisma.siswa.findUnique({ where, include });
};

export const updateSiswa = async (
  where: Prisma.SiswaWhereUniqueInput,
  data: Prisma.SiswaUpdateInput,
) => {
  return await prisma.siswa.update({ where, data });
};

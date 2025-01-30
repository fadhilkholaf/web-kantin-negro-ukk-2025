import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const deleteUserStan = async (
  where: Prisma.UserStanWhereUniqueInput,
) => {
  return await prisma.userStan.delete({ where });
};

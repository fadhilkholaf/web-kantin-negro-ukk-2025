import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as unknown as { prisma: PrismaClient }).prisma) {
    (global as unknown as { prisma: PrismaClient }).prisma = new PrismaClient();
  }
  prisma = (global as unknown as { prisma: PrismaClient }).prisma;
}

export default prisma;

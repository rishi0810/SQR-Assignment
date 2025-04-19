import { PrismaClient } from "../generated/prisma/index.js";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({});

global.prisma = prisma;

export default prisma;
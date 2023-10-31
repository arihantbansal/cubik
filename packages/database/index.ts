/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

export * from '@prisma/client';

config();
declare global {
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
}

// const prisma = new PrismaClient();
export { prisma };

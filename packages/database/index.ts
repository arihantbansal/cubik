/* eslint-disable turbo/no-undeclared-env-vars */
export * from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();
const globalForPrisma = globalThis as { prisma?: PrismaClient };
const url = process.env.PROD_DATABASE_URL as string;
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    datasources: {
      db: {
        url: url,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

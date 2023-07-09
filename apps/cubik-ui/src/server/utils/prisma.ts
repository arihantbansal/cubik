import { PrismaClient } from 'database';
import { env } from '~/env.mjs';
declare global {
  var prisma: PrismaClient | undefined;
}
export const prisma = global.prisma || new PrismaClient();

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

async function connectDB() {
  try {
    await prisma.$connect();
  } catch (error) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

export default connectDB;

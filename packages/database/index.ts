import { connect } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { fetch as undiciFetch } from 'undici';





export * from '@prisma/client';

config();
declare global {
  var prisma: PrismaClient;
}

let prisma: PrismaClient;


if (typeof window === 'undefined') {

  const connection = connect({
    url: process.env.PROD_DATABASE_URL,
    fetch: undiciFetch,
  });
  const adapter = new PrismaPlanetScale(connection);

  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({ adapter });
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient({ adapter });
    }
    prisma = global.prisma; 

  }
}

// const prisma = new PrismaClient();
export { prisma };

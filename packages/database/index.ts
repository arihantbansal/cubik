import { PrismaClient } from '@prisma/client';
import { PrismaClient as PrismaEdge } from "@prisma/client/edge";

const prisma = new PrismaClient();
const prismaEdge = new PrismaEdge();
export { prismaEdge, PrismaClient,PrismaEdge };
export default prisma;
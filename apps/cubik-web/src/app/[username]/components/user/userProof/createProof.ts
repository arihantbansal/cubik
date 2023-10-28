'use server';

import type { ProofType } from '@cubik/database';
import { prisma } from '@cubik/database';

interface Data {
  proofInfo: any;
  proofType: ProofType;
  userId: string;
}
export const createProof = async (data: Data) => {
  try {
    const find = await prisma.proof.findFirst({
      where: {
        proofType: data.proofType,
        proofInfo: {
          equals: data.proofInfo.username,
          string_contains: data.proofInfo.username,
          path: '$.username',
        },
      },
    });
    if (find) return null;
    const res = await prisma.proof.create({
      data: {
        ...data,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUser = async (id: string) => {
  try {
    const res = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createProofSuperteam = async (data: Data) => {
  try {
    const res = await prisma.proof.create({
      data: {
        ...data,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const createProofCubikGrantee = async (data: Data) => {
  try {
    const res = await prisma.proof.create({
      data: {
        ...data,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

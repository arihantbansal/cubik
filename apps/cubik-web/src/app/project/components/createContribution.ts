"use server";
import { prisma } from "@cubik/database";

interface CreateContributionInput {
  token: string;
  totalAmount: number;
  totalUsdAmount: number;
  tx: string;
  isIncluded: boolean;
  projectJoinHackathonId?: string;
  projectJoinRoundId?: string;
  projectId: string;
  userId: string;
}
export const createContribution = async (data: CreateContributionInput) => {
  try {
    const res = await prisma.contribution.create({
      data: {
        split: 0,
        token: data.token,
        totalAmount: data.totalAmount,
        totalUsdAmount: data.totalUsdAmount,
        tx: data.tx,
        isIncluded: data.isIncluded,
        projectJoinHackathonId: data.projectJoinHackathonId,
        projectJoinRoundId: data.projectJoinRoundId,
        projectId: data.projectId,
        userId: data.userId,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

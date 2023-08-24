"use server";
import { prisma } from "@cubik/database";

interface CreateContributionInput {
  token: string;
  totalAmount: number;
  totalUsdAmount: number;
  tx: string;
  isIncluded: boolean;
  projectJoinRoundId?: string;
  projectId: string;
  userId: string;
  hackathonId?: string;
}
export const createContribution = async (data: CreateContributionInput) => {
  try {
    const joinId = await prisma.projectJoinHackathon.findFirst({
      where: {
        projectId: data.projectId,
        hackathonId: data.hackathonId,
      },
      select: {
        id: true,
      },
    });
    const res = await prisma.contribution.create({
      data: {
        split: 0,
        token: data.token,
        totalAmount: data.totalAmount,
        totalUsdAmount: data.totalUsdAmount,
        tx: data.tx,
        isIncluded: data.isIncluded,
        projectJoinHackathonId: joinId?.id,
        projectJoinRoundId: data.projectJoinRoundId,
        projectId: data.projectId,
        userId: data.userId,
        hackathonId: data.hackathonId,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

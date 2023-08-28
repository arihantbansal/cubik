"use server";
import { decodeToken } from "@/utils/helpers/auth";
import { prisma } from "@cubik/database";
import { cookies } from "next/headers";
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
    const auth = cookies().get("authToken");

    if (!auth) {
      throw new Error("Not authenticated");
    }

    const user = await decodeToken(auth.value);

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
        isIncluded: false,
        projectJoinHackathonId: joinId?.id,
        projectJoinRoundId: data.projectJoinRoundId,
        projectId: data.projectId,
        userId: user?.id as string,
        hackathonId: data.hackathonId,
        isArchive: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

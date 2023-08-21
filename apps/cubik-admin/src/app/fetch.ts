"use server";
import { prisma } from "@cubik/database";
export const fetchDetails = async () => {
  try {
    const res = await prisma.hackathon.findFirst({
      where: {
        id: "8e23ade0-0dae-4c4b-83aa-67867749029c",
      },
      include: {
        _count: {
          select: {
            projectJoinHackathon: true,
            hackathonSponsors: true,
            team: true,
          },
        },
      },
    });

    return res?._count || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

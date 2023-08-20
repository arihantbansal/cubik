"use server";

import { prisma } from "@cubik/database";

export const fetchSponsors = async () => {
  try {
    const res = await prisma.hackathon.findFirst({
      where: {
        id: "8e23ade0-0dae-4c4b-83aa-67867749029c",
      },
      include: {
        projectJoinHackathon: {
          include: {
            project: {
              include: {
                owner: true,
              },
            },
          },
        },
        hackathonSponsors: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

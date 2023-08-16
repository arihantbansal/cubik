"use server";

import { prisma } from "@cubik/database";

export const createJoinHackathon = (hackathonId: string, projectId: string) => {
  const res = prisma.projectJoinHackathon.create({
    data: {
      tx: "asdfasdf",
      hackathonId: hackathonId,
      projectId: projectId,
    },
  });
  return res;
};

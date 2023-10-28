'use server';

import { prisma } from '@cubik/database';

export const getUserProjects = async (mainWallet: string) => {
  try {
    const res = prisma.project.findMany({
      where: {
        ownerPublickey: mainWallet,
        isActive: true,
        isArchive: false,
        // status: "VERIFIED",
      },
      select: {
        id: true,
        name: true,
        shortDescription: true,
        logo: true,
        status: true,
        projectUserCount: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const isValidProject = async (mainWallet: string) => {
  try {
    const res = await prisma.projectJoinHackathon.findMany({
      where: {
        project: {
          ownerPublickey: mainWallet,
        },
      },
      select: {
        project: {
          select: {
            id: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    console.log(error);

    return [];
  }
};

export const createJoinHackathon = (
  hackathonId: string,
  projectId: string,
  tracks: any[],
) => {
  const res = prisma.projectJoinHackathon.create({
    data: {
      tx: 'asdfasdf',
      hackathonId: hackathonId,
      projectId: projectId,
      tracks: tracks || {},
    },
  });
  return res;
};

'use server';

import { cookies } from 'next/headers';

import { decodeToken } from '@cubik/auth';
import type { Project, Team } from '@cubik/database';
import { prisma } from '@cubik/database';

export const createProject = async (project: Project, team: Team[]) => {
  try {
    const auth = cookies().get('authToken');
    if (!auth) {
      throw new Error('Not authorized');
    }

    const user = await decodeToken(auth.value);

    await prisma.project.create({
      data: {
        industry: project.industry,
        logo: project.logo,
        longDescription: project.longDescription,
        name: project.name,
        shortDescription: project.shortDescription,
        status: project.status,
        createKey: project.createKey,
        discordLink: project.discordLink,
        email: project.email,
        failedReason: project.failedReason,
        githubLink: project.githubLink,
        id: project.id,
        isActive: project.isActive,
        isArchive: project.isArchive,
        mutliSigAddress: project.mutliSigAddress,
        ogImage: project.ogImage,
        ownerPublickey: user?.mainWallet as string,
        telegramLink: project.telegramLink,
        twitterHandle: project.twitterHandle,
        tx: project.tx,
        projectLink: project.projectLink,
        projectUserCount: project.projectUserCount,
      },
    });

    await prisma.team.createMany({
      data: team,
    });
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

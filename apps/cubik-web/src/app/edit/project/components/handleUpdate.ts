'use server';

import { cookies } from 'next/headers';

import { decodeToken } from '@cubik/auth';
import type { Project } from '@cubik/database';
import { prisma } from '@cubik/database';

export const handleUpdate = async (project: Partial<Project>) => {
  try {
    const auth = cookies().get('authToken');
    if (!auth) {
      throw new Error('Not authorized');
    }
    const user = await decodeToken(auth.value);

    if (!user?.username) {
      throw new Error('Not authorized');
    }

    const projectCheck = await prisma.project.findFirst({
      where: {
        id: project.id,
      },
      select: {
        ownerPublickey: true,
      },
    });

    if (projectCheck?.ownerPublickey !== user.mainWallet) {
      throw new Error('Not authorized');
    }

    await prisma.project.update({
      where: {
        id: project.id,
        ownerPublickey: user.mainWallet,
      },
      data: {
        name: project.name,
        discordLink: project.discordLink,
        email: project.email,
        githubLink: project.githubLink,
        longDescription: project.longDescription,
        twitterHandle: project.twitterHandle,
        industry: project.industry,
        shortDescription: project.shortDescription,
        logo: project.logo,
        projectLink: project.projectLink,
        telegramLink: project.telegramLink,
      },
    });

    return null;
  } catch (error) {
    console.log(error);
    throw new Error('Error while updating project');
  }
};

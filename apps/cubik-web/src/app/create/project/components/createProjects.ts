"use server";
import { Project, Team, prisma } from "@cubik/database";

export const createProject = async (project: Project, team: Team[]) => {
  try {
    const res = await prisma.project.create({
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
        ownerPublickey: project.ownerPublickey,
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
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

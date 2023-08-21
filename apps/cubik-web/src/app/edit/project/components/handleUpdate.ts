"use server";

import { Project, Team, prisma } from "@cubik/database";

export const handleUpdate = async (project: Partial<Project>, team: Team[]) => {
  try {
    const res = await prisma.project.update({
      where: {
        id: project.id,
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
    return res;
    // team.forEach(async (member) => {
    //   await prisma.team.upsert({
    //     where: {
    //       userId: member.userId,
    //       projectId: member.projectId as string,
    //     },
    //     update: {},
    //     create: {
    //       userId: member.userId,
    //       projectId: member.projectId,
    //     },
    //   });
    // });
  } catch (error) {
    console.log(error);
    throw new Error("Error while updating project");
  }
};

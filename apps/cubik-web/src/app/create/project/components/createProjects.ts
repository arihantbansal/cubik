"use server";
import { Project, Team, prisma } from "@cubik/database";

export const createProject = async (project: Project, team: Team[]) => {
  try {
    const res = await prisma.project.create({
      data: project,
    });
    if (res) {
      await prisma.team.createMany({
        data: team,
      });
    }
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

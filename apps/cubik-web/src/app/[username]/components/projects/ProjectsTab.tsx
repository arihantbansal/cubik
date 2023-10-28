import React from 'react';

import { prisma } from '@cubik/database';

import { EmptyState } from './EmptyState';
import { ProjectCards } from './ProjectCards';

interface Props {
  username: string;
}
const getProjects = async (username: string) => {
  try {
    const res = await prisma.project.findMany({
      where: {
        // isArchive: false,
        owner: {
          username: username,
          isArchive: false,
        },
      },
      select: {
        id: true,
        name: true,
        logo: true,
        projectLink: true,
        status: true,
        shortDescription: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const ProjectsTab = async ({ username }: Props) => {
  const projects = await getProjects(username);

  if (projects.length === 0) {
    return <EmptyState username={username} />;
  }

  return <ProjectCards projects={projects} username={username} />;
};

import React from "react";
import { prisma } from "@cubik/database";

export const getProject = async (slug: string) => {
  return await prisma.projectsModel.findFirst({
    where: {
      id: slug, // replace this id with the project slug
    },
  });
};

const ProjectPreview = async ({ params }: { params: { slug: string } }) => {
  const project = await getProject(params.slug);
  return (
    <>
      <div>{JSON.stringify(project)}</div>
    </>
  );
};

export default ProjectPreview;

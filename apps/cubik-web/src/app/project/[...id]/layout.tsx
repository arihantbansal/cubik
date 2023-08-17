import { Box, Container, Stack } from "@/utils/chakra";
import { prisma } from "@cubik/database";
import React from "react";
import { ProjectHeader } from "../components/ProjectHeader";

interface Props {
  params: {
    id: string[];
  };
  children: React.ReactNode;
}
type Event = "preview" | "round" | "hackathon";
const fetchProject = async (
  id: string,
  event?: "hackathon" | "round",
  eventId?: string
) => {
  try {
    // when hackathon
    if (event && eventId && event === "hackathon") {
      const res = await prisma.project.findFirst({
        where: {
          id: id,
        },

        select: {
          id: true,
          name: true,
          industry: true,
          shortDescription: true,
          logo: true,
          projectLink: true,
        },
        // include: {
        //   projectJoinHackathon: {
        //     where: {
        //       id: eventId,
        //     },
        //     select: {
        //       id: true,
        //     },
        //   },
        // },
      });
      return res;
    }
    // when round
    if (event && eventId && event === "round") {
      const res = await prisma.project.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          industry: true,
          shortDescription: true,
          logo: true,
          projectLink: true,
        },
        // include: {
        //   projectJoinRound: {
        //     where: {
        //       id: eventId,
        //     },
        //   },
        // },
      });
      return res;
    }
    // default
    const res = await prisma.project.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        industry: true,
        shortDescription: true,
        logo: true,
        projectLink: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const ProjectPageLayout = async ({ params, children }: Props) => {
  console.log(params);
  const project = await fetchProject(params.id[0] as string);
  if (!project) {
    return <Box mt={10}>Project not found</Box>; // error state
  }
  return (
    <>
      <Container maxW={"full"} p="0">
        <Stack
          maxW="7xl"
          mx="auto"
          gap={{ base: "24px", md: "12px", lg: "60px", xl: "100px" }}
          px={{ base: "1rem", sm: "2rem", md: "2rem", xl: "1rem" }}
          py={{ base: "24px", md: "64px" }}
          alignItems={"start"}
          mt={10}
          justifyContent={"start"}
        >
          <ProjectHeader
            projectLink={project.projectLink}
            eventId={params.id[2]} // optional
            type={(params.id[1] as Event) || "preview"} // optional
            industry={project.industry}
            logo={project.logo}
            name={project.name}
            shortDescription={project.shortDescription}
            key={project.id}
          />
          <Stack
            w="full"
            mx="auto"
            direction={{ base: "column", lg: "row" }}
            alignItems={"start"}
            justifyContent={"start"}
          >
            {children}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default ProjectPageLayout;

import { Box, Container, Stack } from "@/utils/chakra";
import { prisma } from "@cubik/database";
import React from "react";
import { ProjectHeader } from "../components/ProjectHeader";
import { ProjectDetailsLiveHackathonStatus } from "../components/ProjectDetailsLiveHackathonStatus";

interface Props {
  params: {
    id: string[];
  };
  children: React.ReactNode;
}
type Event = "preview" | "round" | "hackathon";
interface ProjectReturnType {
  id: string;
  name: string;
  industry: string;
  shortDescription: string;
  logo: string;
  projectLink: string;
  createdAt: Date;
  owner: {
    username: string;
  };
  projectJoinHackathon?: {
    hackathon: {
      name: string;
      hackathonEndDate: Date;
      hackathonStartDate: Date;
      votingEndDate: Date;
      votingStartDate: Date;
    };
  }[];
}
const fetchProject = async (
  id: string,
  event?: "hackathon" | "round",
  eventId?: string
): Promise<ProjectReturnType | null> => {
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
          createdAt: true,
          owner: true,
          projectJoinHackathon: {
            where: {
              hackathonId: eventId,
            },
            select: {
              hackathon: {
                select: {
                  name: true,
                  hackathonEndDate: true,
                  hackathonStartDate: true,
                  votingEndDate: true,
                  votingStartDate: true,
                },
              },
            },
          },
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
      return res as ProjectReturnType;
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
      });
      return res as ProjectReturnType;
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
    return res as ProjectReturnType;
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

  console.log("fetchProject - ", project);
  return (
    <>
      <Container maxW={"full"} p="0" mt="4.5rem">
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
          {/* {params.id[1] === "hackathon" && (
            <ProjectDetailsLiveHackathonStatus
              endTime={
                (project?.projectJoinHackathon &&
                  project?.projectJoinHackathon[0]?.hackathon.votingEndDate) ||
                new Date()
              }
              hackathonName={
                (project?.projectJoinHackathon &&
                  project?.projectJoinHackathon[0]?.hackathon.name) ||
                ""
              }
              startTime={
                (project?.projectJoinHackathon &&
                  project?.projectJoinHackathon[0]?.hackathon
                    .votingStartDate) ||
                new Date()
              }
              status={ProjectVerifyStatus.REVIEW}
              show={true}
            />
          )} */}
          <ProjectHeader
            projectLink={project.projectLink}
            eventId={params.id[2]} // optional
            type={(params.id[1] as Event) || "preview"} // optional
            industry={project.industry}
            logo={project.logo}
            name={project.name}
            shortDescription={project.shortDescription}
            key={project.id}
            owner={project.owner}
          />
          {children}
        </Stack>
      </Container>
    </>
  );
};

export default ProjectPageLayout;

import React from "react";
import { ProjectTabs } from "../components/ProjectTabs";
import { SideBar } from "../components/Sidebar";
import { Prisma, User, prisma } from "@cubik/database";

interface Props {
  params: {
    id: string[];
  };
}
interface ProjectDetailsReturnType {
  longDescription: string;
  twitterHandle: string;
  githubLink: string;
  discordLink: string;
  telegramLink: string;
  team: {
    user: User;
  }[];
  projectJoinHackathon?: {
    tracks: Prisma.JsonValue;
  }[];
}
const ProjectDetails = async (
  id: string,
  event?: "hackathon" | "round",
  eventId?: string
): Promise<ProjectDetailsReturnType | null> => {
  try {
    if (eventId && event === "hackathon") {
      const res = await prisma.project.findUnique({
        where: {
          id: id,
        },
        select: {
          longDescription: true,
          twitterHandle: true,
          githubLink: true,
          discordLink: true,
          telegramLink: true,
          team: {
            select: {
              user: true,
            },
          },
          projectJoinHackathon: {
            where: {
              id: eventId,
            },
            select: {
              tracks: true,
            },
          },
        },
      });
      return res;
    }
    const res = await prisma.project.findFirst({
      where: {
        id: id,
      },
      select: {
        longDescription: true,
        twitterHandle: true,
        githubLink: true,
        discordLink: true,
        telegramLink: true,
        team: {
          select: {
            user: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ProjectPage = async ({ params: { id } }: Props) => {
  const projectDetails = await ProjectDetails(
    id[0] as string,
    id[1] as "hackathon" | "round",
    id[2]
  );

  return (
    <>
      <ProjectTabs
        id={id[0] as string}
        eventId={id[2] as string}
        eventType={id[1] as "hackathon" | "round" | "preview"}
        longDescription={
          (projectDetails?.longDescription as string) || "default"
        }
      />
      <SideBar
        team={projectDetails?.team || []}
        discord_link={projectDetails?.discordLink as string}
        github_link={projectDetails?.githubLink as string}
        telegram_link={projectDetails?.telegramLink as string}
        twitter_handle={projectDetails?.twitterHandle as string}
        tracks={
          projectDetails?.projectJoinHackathon
            ? (projectDetails.projectJoinHackathon[0]?.tracks as {
                label: string;
                value: string;
              }[])
            : []
        }
      />
    </>
  );
};

export default ProjectPage;

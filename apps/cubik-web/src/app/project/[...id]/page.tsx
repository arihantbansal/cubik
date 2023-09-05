import React from "react";
import { ProjectTabs } from "../components/ProjectTabs";
import { SideBar } from "../components/Sidebar";
import type { Prisma, User } from "@cubik/database";
import { prisma } from "@cubik/database";
import { Stack } from "@/utils/chakra";
import type { Metadata, ResolvingMetadata } from "next";
import { utils } from "@coral-xyz/anchor";
// import type { Metadata, ResolvingMetadata } from "next";

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

  contribution?: {
    totalUsdAmount: number;
  }[];
  projectJoinHackathon?: {
    tracks: Prisma.JsonValue;
    hackathon: {
      name: string;
      hackathonEndDate: Date;
      hackathonStartDate: Date;
      votingEndDate: Date;
      votingStartDate: Date;
    };
  }[];
  amount?: number;
}
const ProjectDetails = async (
  id: string,
  event?: "hackathon" | "round",
  eventId?: string
): Promise<ProjectDetailsReturnType | null> => {
  try {
    if (eventId && event === "hackathon") {
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
          contribution: {
            where: {
              hackathonId: eventId,
            },
            select: {
              totalUsdAmount: true,
            },
          },
          projectJoinHackathon: {
            where: {
              hackathonId: eventId,
            },
            select: {
              tracks: true,
              amount: true,
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
      });
      return res as ProjectDetailsReturnType;
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

interface OgProps {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata(
  { params }: OgProps,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const projects = await prisma.project.findUnique({
    where: {
      id: params.id[0],
    },
    select: {
      name: true,
      shortDescription: true,
      logo: true,
      ogImage: true,
    },
  });

  // const newImage = await fetch(
  //   `,
  //   {
  //     method: "GET",
  //     cache: "force-cache",
  //   }
  // );
  const newImage = `/api/og?name=${utils.bytes.base64.encode(
    Buffer.from(projects?.name ?? "default")
  )}&tagline=${utils.bytes.base64.encode(
    Buffer.from(projects?.shortDescription ?? "default")
  )}&logo=${utils.bytes.base64.encode(
    Buffer.from(projects?.logo ?? "default")
  )}`;
  const previousImages = (await parent)?.openGraph?.images ?? [];

  return {
    title: projects?.name,
    description: projects?.shortDescription,
    metadataBase: new URL("https://www.cubik.so"),
    openGraph: {
      type: "website",
      images: [`${newImage}`, ...previousImages],
      title: projects?.name,
      description: projects?.shortDescription,
    },
    twitter: {
      card: "summary_large_image",
      images: [`${newImage}`, ...previousImages],
      title: projects?.name,
      description: projects?.shortDescription,
    },
  };
}

const ProjectPage = async ({ params: { id } }: Props) => {
  const projectDetails = await ProjectDetails(
    id[0]!,
    id[1] as "hackathon" | "round",
    id[2]
  );
  return (
    <Stack
      w="full"
      mx="auto"
      gap="24px"
      direction={{ base: "column-reverse", lg: "row" }}
      alignItems={"start"}
      justifyContent={"space-between"}
    >
      <ProjectTabs
        id={id[0]!}
        eventId={id[2]}
        eventType={id[1] as "hackathon" | "round" | "preview"}
        longDescription={projectDetails?.longDescription ?? "default"}
      />
      <SideBar
        communitycontributions={
          projectDetails?.contribution?.reduce(
            (acc, cur) => (acc += cur.totalUsdAmount),
            0
          ) ?? 0
        }
        contributors={projectDetails?.contribution?.length ?? 0}
        funding={projectDetails?.amount ?? 0}
        team={projectDetails?.team ?? []}
        discord_link={projectDetails?.discordLink ?? ""}
        github_link={projectDetails?.githubLink ?? ""}
        telegram_link={projectDetails?.telegramLink ?? ""}
        twitter_handle={projectDetails?.twitterHandle ?? ""}
        tracks={
          projectDetails?.projectJoinHackathon &&
          projectDetails?.projectJoinHackathon[0]?.tracks
            ? (projectDetails.projectJoinHackathon[0]?.tracks as {
                label: string;
                value: string;
              }[])
            : []
        }
      />
    </Stack>
  );
};

export default ProjectPage;

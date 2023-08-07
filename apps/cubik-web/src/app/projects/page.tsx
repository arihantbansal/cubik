import { formatNumberWithK } from "@/utils/helpers/formatWithK";
import { prisma } from "@cubik/database";
import Projects, { Project } from "./components";

const getProjects = async () => {
  const projects = await prisma.projectJoinRound.findMany({
    where: {
      status: "APPROVED",
    },
    orderBy: {
      amountRaise: "desc",
    },
    select: {
      id: true,
      status: true,
      amountRaise: true,
      fundingRound: {
        select: {
          id: true,
          colorScheme: true,
          active: true,
          endTime: true,
          roundName: true,
          startTime: true,
        },
      },
      project: {
        select: {
          id: true,
          industry: true,
          logo: true,
          name: true,
          project_link: true,
          short_description: true,
          owner: {
            select: {
              username: true,
            },
          },
          isArchive: true,
          Contribution: {
            take: 3,
            orderBy: {
              currentusdTotal: "desc",
            },
            distinct: "userId",
            select: {
              count: true,
              user: {
                select: {
                  profilePicture: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return projects.map(({ id, status, amountRaise, fundingRound, project }) => {
    console.log(project.Contribution);

    return {
      id,
      projectId: project.id,
      owner: project.owner,
      status,
      name: project.name,
      logo: project.logo,
      description: project.short_description,
      amountRaised: amountRaise
        ? formatNumberWithK(parseInt(amountRaise.toFixed(2)))
        : "0",
      industry: JSON.parse(project.industry) as Project["industry"],
      contributors: {
        count: project.Contribution[0]?.count || 0,
        images: project.Contribution.filter(
          (c) => c.user.profilePicture !== null
        ).map((c) => {
          return c.user.profilePicture!;
        }),
      },
    };
  });
};

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  shuffledArray.sort(() => Math.random() - 0.5);
  return shuffledArray;
}

export default async function () {
  const projects = await shuffle(await getProjects());

  return <Projects projects={projects} />;
}

export const revalidate = 3600;

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
      _count: {
        select: {
          contribution: true,
        },
      },
      id: true,
      status: true,
      amountRaise: true,
      round: {
        select: {
          id: true,
          colorScheme: true,
          isActive: true,
          endTime: true,
          name: true,
          startTime: true,
        },
      },
      project: {
        select: {
          id: true,
          industry: true,
          logo: true,
          name: true,
          projectLink: true,
          shortDescription: true,
          owner: {
            select: {
              username: true,
            },
          },
          isArchive: true,
          contribution: {
            take: 3,

            orderBy: {
              totalAmount: "desc",
            },

            distinct: "userId",
            select: {
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

  return projects.map(({ id, status, amountRaise, project, round, _count }) => {
    return {
      id,
      projectId: project.id,
      owner: project.owner,
      status,
      name: project.name,
      logo: project.logo,
      description: project.shortDescription,
      amountRaised: amountRaise
        ? formatNumberWithK(parseInt(amountRaise.toFixed(2)))
        : "0",
      industry: JSON.parse(project.industry) as Project["industry"],
      contributors: {
        count: _count.contribution,
        images: project.contribution
          .filter((c) => c.user.profilePicture !== null)
          .map((c) => {
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

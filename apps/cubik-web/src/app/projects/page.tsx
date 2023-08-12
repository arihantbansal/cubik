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
          Contribution: true,
        },
      },
      id: true,
      status: true,
      amountRaise: true,
      Round: {
        select: {
          id: true,
          colorScheme: true,
          isActive: true,
          endTime: true,
          name: true,
          startTime: true,
        },
      },
      Project: {
        select: {
          id: true,
          industry: true,
          logo: true,
          name: true,
          projectLink: true,
          shortDescription: true,
          Owner: {
            select: {
              username: true,
            },
          },
          isArchive: true,
          Contribution: {
            take: 3,

            orderBy: {
              totalAmount: "desc",
            },

            distinct: "userId",
            select: {
              User: {
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

  return projects.map(({ id, status, amountRaise, Project, Round, _count }) => {
    return {
      id,
      projectId: Project.id,
      owner: Project.Owner,
      status,
      name: Project.name,
      logo: Project.logo,
      description: Project.shortDescription,
      amountRaised: amountRaise
        ? formatNumberWithK(parseInt(amountRaise.toFixed(2)))
        : "0",
      industry: JSON.parse(Project.industry) as Project["industry"],
      contributors: {
        count: _count.Contribution,
        images: Project.Contribution.filter(
          (c) => c.User.profilePicture !== null
        ).map((c) => {
          return c.User.profilePicture!;
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

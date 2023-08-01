import { ProjectExplorerType, ProjectExploreBanner, HackathonSchedule } from '@cubik/common-types';
import { prisma } from '@cubik/database';
import { Request, Response } from 'express';

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const projectExplorer = async (req: Request, res: Response) => {
  try {
    const projectJoinRoundPromise = prisma.projectJoinRound.findMany({
      where: {
        status: 'APPROVED',
        fundingRound: {
          endTime: {
            gte: new Date(),
          },
        },
        isArchive: false,
      },
      select: {
        id: true,
        _count: true,
        amountRaise: true,
        fundingRound: {
          select: {
            roundName: true,
            colorScheme: true,
            matchedPool: true,
            endTime: true,
            startTime: true,
            registrationEndDate: true,
            registrationStartDate: true,
            Contribution: {
              select: {
                projectId: true,
                user: {
                  select: {
                    profilePicture: true,
                  },
                },
              },
            },
          },
        },

        project: {
          select: {
            owner: {
              select: {
                username: true,
              },
            },
            id: true,
            name: true,
            logo: true,
            short_description: true,
            industry: true,
          },
        },
      },
    });
    const projectJoinHackathonPromise = prisma.projectJoinHackathons.findMany({
      where: {
        projectsModel: {
          status: 'VERIFIED',
        },
        isArchive: false,
      },
      select: {
        amount: true,
        id: true,

        projectsModel: {
          select: {
            owner: {
              select: {
                username: true,
              },
            },
            name: true,
            id: true,
            logo: true,
            short_description: true,
            industry: true,
          },
        },

        hackathon: {
          select: {
            background: true,
            name: true,
            prize_pool: true,
            short_description: true,
            logo: true,
            timeline: true,
            contribution: {
              select: {
                projectId: true,
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
    const activeRoundPromise = await prisma.round.findMany({
      where: {
        endTime: {
          gte: new Date(),
        },
      },
      select: {
        startTime: true,
        colorScheme: true,
        roundName: true,
        endTime: true,
        matchedPool: true,
        id: true,
        short_description: true,
      },
    });
    const activeHackathonPromise = await prisma.hackathon.findMany({
      where: {
        isActive: true,
      },
      select: {
        background: true,
        name: true,
        timeline: true,
        prize_pool: true,
        short_description: true,
        logo: true,
        id: true,
      },
    });
    const [projectJoinRound, projectJoinHackathon, activeHackathon, activeRound] =
      await Promise.all([
        projectJoinRoundPromise,
        projectJoinHackathonPromise,
        activeHackathonPromise,
        activeRoundPromise,
      ]);
    const final: ProjectExplorerType[] = [];
    const banner: ProjectExploreBanner[] = [];
    projectJoinRound.forEach(project => {
      final.push({
        id: project.project.id,
        logo: project.project.logo,
        industry: project.project.industry,
        title: project.project.name,
        contributorCount:
          project.fundingRound.Contribution.filter(e => e.projectId === project.project.id).length -
            3 || 0,
        contributors:
          project.fundingRound.Contribution.filter(e => e.projectId === project.project.id).slice(
            3,
          ) || [],
        projectShortDescription: project.project.short_description,
        ownerName: project.project.owner.username as string,
        projectEvent: {
          eventName: 'round',
          color: 'teal',
          amount: project.amountRaise || 0,
          id: project.id,
          end: project.fundingRound.endTime,
          start: project.fundingRound.startTime,
          registrationEnd: project.fundingRound.registrationEndDate,
          registrationStart: project.fundingRound.registrationStartDate,
          name: project.fundingRound.roundName,
        },
      });
    });

    projectJoinHackathon.forEach(project => {
      const schedule = project.hackathon.timeline as unknown as HackathonSchedule;
      final.push({
        id: project.projectsModel.id,
        logo: project.projectsModel.logo,
        industry: project.projectsModel.industry,
        title: project.projectsModel.name,
        contributorCount:
          project.hackathon.contribution.filter(e => e.projectId === project.projectsModel.id)
            .length -
            3 <
          0
            ? 0
            : project.hackathon.contribution.filter(e => e.projectId === project.projectsModel.id)
                .length,
        contributors:
          project.hackathon.contribution
            .filter(e => e.projectId === project.projectsModel.id)
            .slice(3) || [],
        ownerName: project.projectsModel.owner.username as string,
        projectShortDescription: project.projectsModel.short_description,
        projectEvent: {
          eventName: 'hackathon',
          amount: project.amount,
          bg: project.hackathon.background,
          id: project.id,
          end: schedule[2].end as Date,
          start: schedule[2].start as Date,
          hackathonEnd: schedule[1].end as Date,
          hackathonStart: schedule[1].end as Date,
          name: project.hackathon.name,
        },
      });
    });
    activeHackathon.forEach(hackathon => {
      const schedule = hackathon.timeline as unknown as HackathonSchedule;
      banner.push({
        bgImage: hackathon.background,
        endTime: schedule[1]?.end as Date,
        id: hackathon.id,
        matchingPool: hackathon.prize_pool,
        name: hackathon.name,
        type: 'hackathon',
        startTime: schedule[1]?.start as Date,
        shortDescription: hackathon.short_description,
      });
    });

    activeRound.forEach(round => {
      banner.push({
        colorScheme: round.colorScheme,
        endTime: round.endTime,
        id: round.id,
        matchingPool: round.matchedPool,
        name: round.roundName,
        type: 'round',
        startTime: round.startTime,
        shortDescription: round.short_description,
      });
    });

    const shuffleFinal = shuffle(final);

    return res.status(200).send({
      projects: shuffleFinal,
      banner: banner,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error });
  }
};

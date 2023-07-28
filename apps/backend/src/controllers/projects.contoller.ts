import { ProjectExplorerType, ProjectExploreBanner } from '@cubik/comman-types';
import { prisma } from '@cubik/database';
import { Request, Response } from 'express';

export const projectExplorer = async (req: Request, res: Response) => {
  try {
    const projectJoinRoundPromise = prisma.projectJoinRound.findMany({
      where: {
        status: 'APPROVED',
        fundingRound: {
          endTime: {
            // gte: new Date(),
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
          },
        },
        contributors: {
          take: 3,
          select: {
            user: {
              select: {
                profilePicture: true,
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
        colorScheme: true,
        roundName: true,
        endTime: true,
        matchedPool: true,
        id: true,
      },
    });
    const activeHackathonPromise = await prisma.hackathon.findMany({
      where: {
        isActive: true,
      },
      select: {
        background: true,
        name: true,
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
        logo: project.project.logo,
        industry: project.project.industry,
        title: project.project.name,
        amount: project.amountRaise as number,
        contributorCount: project._count.contributors,
        contributors: project.contributors,
        ownerName: project.project.owner.username,
        type: 'round',
        projectJoinRound: {
          color: project.fundingRound.colorScheme,
          id: project.id,
          name: project.fundingRound.roundName,
        },
      });
    });

    projectJoinHackathon.forEach(project => {
      final.push({
        logo: project.projectsModel.logo,
        industry: project.projectsModel.industry,
        title: project.projectsModel.short_description,
        amount: project.amount,
        contributorCount: 0,
        contributors: [],
        ownerName: project.projectsModel.owner.username,
        type: 'hackathon',
        projectJoinHackathon: {
          bgImage: project.hackathon.background,
          id: project.id,
          name: project.hackathon.name,
        },
      });
    });
    activeHackathon.forEach(hackathon => {
      banner.push({
        bgImage: hackathon.background,
        endTime: new Date(), // change the date
        id: hackathon.id,
        matchingPool: hackathon.prize_pool,
        name: hackathon.name,
        type: 'hackathon',
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
      });
    });
    return res.status(200).send({
      projects: final,
      banner: banner,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error });
  }
};

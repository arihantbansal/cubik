import { ProjectExplorerType } from '@cubik/comman-types';
import { prisma } from '@cubik/database';
import { Request, Response } from 'express';

export const projectExplorer = async (req: Request, res: Response) => {
  try {
    const projectJoinRound = await prisma.projectJoinRound.findMany({
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
          },
        },
        project: {
          select: {
            owner: {
              select: {
                username: true,
              },
            },
            Contribution: {
              select: {
                user: {
                  select: {
                    profilePicture: true,
                  },
                },
              },
            },
            logo: true,
            short_description: true,
            industry: true,
          },
        },
      },
    });
    // const projectJoinHackathon = await prisma.projectJoinHackathons.findMany({
    //   where: {},
    // });
    return res.status(200).json(projectJoinRound);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error });
  }
};

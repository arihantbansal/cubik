'use server';

import type { ProjectPageEventType } from '@/types/project';

import { prisma } from '@cubik/database';

interface StatsReturn {
  estimatedMatch: number;
  communityMatch: number;
  contributors: number;
}

export const getStats = async (
  event: ProjectPageEventType | null,
): Promise<StatsReturn | null> => {
  if (!event) {
    return null;
  }

  if (event.eventType === 'round') {
    const joinRound = await prisma.projectJoinRound.findFirst({
      where: {
        id: event.joinId,
      },
      select: {
        amountRaise: true,
        contribution: {
          select: {
            userId: true,
            totalUsdAmount: true,
          },
        },
      },
    });
    let communityMatch: number = 0;
    const users: string[] = [];
    joinRound?.contribution.forEach((contribution) => {
      if (!users.includes(contribution.userId)) {
        users.push(contribution.userId);
      }
      communityMatch += contribution.totalUsdAmount;
    });

    return {
      estimatedMatch: joinRound?.amountRaise || 0,
      communityMatch: communityMatch,
      contributors: users.length,
    };
  } else if (event.eventType === 'hackathon') {
    const joinHackathon = await prisma.projectJoinHackathon.findFirst({
      where: {
        id: event.joinId,
      },
      select: {
        amount: true,
        contribution: {
          select: {
            userId: true,
            totalUsdAmount: true,
          },
        },
      },
    });
    let communityMatch: number = 0;
    const users: string[] = [];
    joinHackathon?.contribution.forEach((contribution) => {
      if (!users.includes(contribution.userId)) {
        users.push(contribution.userId);
      }
      communityMatch += contribution.totalUsdAmount;
    });

    return {
      estimatedMatch: joinHackathon?.amount || 0,
      communityMatch: communityMatch,
      contributors: users.length,
    };
  } else {
    return null;
  }
};

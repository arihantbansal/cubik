'use server';

import type { ProjectPageEventType } from '@/types/project';

import { prisma } from '@cubik/database';

import type { ContributionRowType } from './index';

export const getContributions = async (
  event: ProjectPageEventType | null,
  skip: number,
): Promise<ContributionRowType[] | null> => {
  try {
    if (event === null) return [];

    if (event?.eventType === 'hackathon') {
      const res = await prisma.contribution.findMany({
        where: {
          projectJoinHackathonId: event?.joinId,
        },
        select: {
          id: true,
          totalAmount: true,
          totalUsdAmount: true,
          createdAt: true,
          token: true,
          user: {
            select: {
              id: true,
              mainWallet: true,
              username: true,
              profileNft: true,
              profilePicture: true,
            },
          },
        },
        take: 10,
        skip: skip,
        orderBy: {
          createdAt: 'asc',
        },
      });

      return res;
    } else {
      const res = await prisma.contribution.findMany({
        where: {
          projectJoinRoundId: event?.joinId,
        },
        select: {
          id: true,
          totalAmount: true,
          totalUsdAmount: true,
          createdAt: true,
          token: true,
          user: {
            select: {
              id: true,
              mainWallet: true,
              username: true,
              profileNft: true,
              profilePicture: true,
            },
          },
        },
        take: 10,
        skip: skip,
        orderBy: {
          createdAt: 'asc',
        },
      });

      return res;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTopEarner = async (event: ProjectPageEventType | null) => {
  try {
    if (event?.eventType === 'hackathon') {
      const res = await prisma.contribution.findMany({
        where: {
          projectJoinHackathonId: event?.joinId,
        },
        select: {
          userId: true,
          totalUsdAmount: true,
          id: true,
          user: {
            select: {
              id: true,
              username: true,
              profileNft: true,
              profilePicture: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const topEarnerMap = new Map<string, number>();

      res.forEach((item) => {
        const currentAmount = topEarnerMap.get(item.userId) || 0;
        topEarnerMap.set(item.userId, currentAmount + item.totalUsdAmount);
      });

      // Convert the Map to an array and sort it by the amount
      const topEarnerArray = Array.from(topEarnerMap.entries())
        .map(([userId, amount]) => ({ userId, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

      return topEarnerArray.map((item) => {
        const earner = res.find((i) => i.userId === item.userId);

        return {
          ...earner,
          totalUsdAmount: item.amount,
        };
      });
    } else {
      const res = await prisma.contribution.findMany({
        where: {
          projectJoinRoundId: event?.joinId,
        },
        select: {
          userId: true,
          totalUsdAmount: true,
          id: true,
          user: {
            select: {
              id: true,
              username: true,
              profileNft: true,
              profilePicture: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const topEarnerMap = new Map<string, number>();

      res.forEach((item) => {
        const currentAmount = topEarnerMap.get(item.userId) || 0;
        topEarnerMap.set(item.userId, currentAmount + item.totalUsdAmount);
      });

      // Convert the Map to an array and sort it by the amount
      const topEarnerArray = Array.from(topEarnerMap.entries())
        .map(([userId, amount]) => ({ userId, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

      return topEarnerArray.map((item) => {
        const earner = res.find((i) => i.userId === item.userId);

        return {
          ...earner,
          totalUsdAmount: item.amount,
        };
      });
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { prisma } from '@cubik/database';

export async function POST(request: NextRequest) {
  try {
    const { eventId } = await request.json();
    console.log(eventId);

    const matchingPool = 2000;
    let summed = 0;
    const res = await prisma.contribution.findMany({
      where: {
        isArchive: false,
        isIncluded: true,
        hackathonId: eventId,
      },
    });

    const projects = await prisma.projectJoinHackathon.findMany({
      where: {
        hackathonId: eventId,
        isArchive: false,
        project: {
          isActive: true,
          isArchive: false,
        },
      },
    });

    let projectMapContribution: {
      user: string;
      projectId: string;
      amount: number;
    }[] = [];

    const finalCheck = res.map((contribution) => {
      return {
        user: contribution.userId,
        projectId: contribution.projectId,
        amount: contribution.totalUsdAmount,
      };
    });

    finalCheck.forEach((contri) => {
      if (
        projectMapContribution.findIndex(
          (e) => e.projectId === contri.projectId && e.user === contri.user,
        ) >= 0 &&
        projectMapContribution[
          projectMapContribution?.findIndex(
            (e) =>
              e.projectId === contri?.projectId && e?.user === contri?.user,
          )
        ]
      ) {
        const current =
          projectMapContribution[
            projectMapContribution?.findIndex(
              (e) =>
                e.projectId === contri?.projectId && e?.user === contri?.user,
            )
          ];
        projectMapContribution[
          projectMapContribution?.findIndex(
            (e) =>
              e.projectId === contri?.projectId && e?.user === contri?.user,
          )
        ] = {
          amount: (current?.amount || 0) + contri?.amount,
          projectId: current?.projectId as string,
          user: current?.user as string,
        };
      } else {
        console.log('pushed');
        projectMapContribution.push(contri);
      }
    });
    const arrOfMatch: {
      projectId: string;
      sum: number;
    }[] = [];
    projects.forEach((project) => {
      let sumAmount = 0;
      projectMapContribution
        .filter((projects) => projects.projectId === project.projectId)
        .forEach((project) => {
          sumAmount += Math.sqrt(project.amount);
        });

      sumAmount *= sumAmount;
      summed += sumAmount;
      arrOfMatch.push({
        projectId: project.projectId,
        sum: sumAmount,
      });
    });

    let divisor = matchingPool / summed;

    const finalMatch = projects.map((project) => {
      return {
        projectId: project.projectId,
        amount:
          arrOfMatch.filter((e) => e.projectId === project.projectId)[0]?.sum! *
          divisor,
      };
    });

    // finalMatch.forEach(async (e) => {
    //   return await prisma.projectJoinHackathon.update({
    //     where: {
    //       id: projects.find((r) => r.projectId === e.projectId)?.id,
    //     },
    //     data: {
    //       amount: e.amount,
    //     },
    //   });
    // });

    return NextResponse.json({
      e: finalMatch,
      res: projects,
    });
  } catch (error) {
    console.log(error);
  }
}

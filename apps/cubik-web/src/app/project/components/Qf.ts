'use server';

import { prisma } from '@cubik/database';

export const checkProofs = async (userId: string) => {
  try {
    const res = await prisma.proof.findMany({
      where: {
        userId,
      },
    });
    return res.length;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const updateData = async (eventId: string) => {
  try {
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

    finalMatch.map(
      async (e) =>
        await prisma.projectJoinHackathon.update({
          where: {
            id: projects.find((r) => r.projectId === e.projectId)?.id!,
          },
          data: {
            amount: e.amount,
          },
        }),
    );

    return 'success';
  } catch (error) {
    console.log(error);
    return 'error';
  }
};

interface Props {
  eventId: string;
  eventType: 'hackathon' | 'round';
  projectId: string;
  amount: number;
  user: string;
}
export const EstimateUpdate = async ({
  amount,
  eventId,
  projectId,
  user,
}: Props) => {
  try {
    console.log(amount, '----------------');
    const matchingPool = 2000;
    let summed = 0;
    const res = await prisma.contribution.findMany({
      where: {
        hackathonId: eventId,
      },
    });
    const projects = await prisma.projectJoinHackathon.findMany({
      where: {
        hackathonId: eventId,
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

    [...finalCheck, { projectId, amount, user }].forEach((contri) => {
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
        .forEach((projects) => {
          sumAmount += Math.sqrt(projects.amount);
        });

      sumAmount *= sumAmount;
      summed += sumAmount;
      arrOfMatch.push({
        projectId: project.projectId,
        sum: sumAmount,
      });
    });
    console.log(summed);
    let divisor = matchingPool / summed;
    console.log(
      arrOfMatch.find(
        (e) => e.projectId === 'e027dba6-529c-4439-aad3-61b674e74363',
      ),
      '---Divisor---',
    );
    const finalMatch = projects.map((project) => {
      return {
        projectId: project.projectId,
        amount:
          arrOfMatch.filter((e) => e.projectId === project.projectId)[0]?.sum! *
          divisor,
      };
    });
    // console.log(ar, "----------------");
    console.log(
      finalMatch.filter((e) => e.projectId === projectId)[0]?.amount,
      projects.find((e) => e.projectId === projectId)?.amount,
    );
    return isNaN(
      finalMatch.filter((e) => e.projectId === projectId)[0]?.amount!,
    )
      ? 0
      : finalMatch.find((e) => e.projectId === projectId)?.amount! -
          projects.find((e) => e.projectId === projectId)?.amount!;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

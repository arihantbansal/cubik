import { Prisma } from '@prisma/client';

type RoundAllType = Prisma.RoundGetPayload<{
  include: {
    Contribution: {
      include: {
        ProjectsModel: true;
      };
    };
    ProjectJoinRound: true;
  };
}>;

export const qfV1 = (round: RoundAllType) => {
  const matchingPool = round.matchedPool;
  let summed = 0;
  const arrOfMatch: {
    projectId: string;
    sum: number;
  }[] = [];
  const projectMapContribution = round.Contribution.map((contribution) => {
    return {
      projectId: contribution.projectId,
      amount: contribution.usdTotal,
    };
  });

  round.ProjectJoinRound.forEach((projectJoin) => {
    let sumAmount = 0;
    projectMapContribution
      .filter((project) => project.projectId === projectJoin.projectId)
      .forEach((project) => {
        sumAmount += Math.sqrt(project.amount);
      });

    sumAmount *= sumAmount;
    summed += sumAmount;
    arrOfMatch.push({
      projectId: projectJoin.projectId,
      sum: sumAmount,
    });
  });
  let divisor = matchingPool / summed;

  const finalMatch = round.ProjectJoinRound.map((project) => {
    return {
      projectId: project.projectId,
      amount:
        arrOfMatch.filter((e) => e.projectId === project.projectId)[0].sum *
        divisor,
    };
  });

  return finalMatch;
};

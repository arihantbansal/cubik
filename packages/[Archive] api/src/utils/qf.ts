import { Prisma } from "@cubik/database";

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
export const qfEstimated = (
  round: RoundAllType,
  projectId: string,
  amount: number
): number => {
  const beforeMatchingPool = qfV1(round);
  const matchingPool = round.matchedPool;
  let summed = 0;
  const arrOfMatch: {
    projectId: string;
    sum: number;
  }[] = [];
  const projectMapContributionWithoutEstimate = round.Contribution.map(
    (contribution) => {
      return {
        projectId: contribution.projectId,
        amount: contribution.usdTotal,
      };
    }
  );

  const projectMapContribution = [
    ...projectMapContributionWithoutEstimate,
    { projectId, amount },
  ];
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

  return (
    finalMatch.filter((e) => e.projectId === projectId)[0].amount -
    beforeMatchingPool.filter((e) => e.projectId === projectId)[0].amount
  );
};

export type HackathonAllType = Prisma.HackathonGetPayload<{
  include: {
    contribution: true;
    projectJoinHackathon: {
      where: {
        isArchive: false;
      };
    };
  };
}>;

export const qfV1Hackathon = (round: HackathonAllType) => {
  const matchingPool = round.prize_pool;
  let summed = 0;
  const arrOfMatch: {
    projectId: string;
    sum: number;
  }[] = [];
  let projectMapContribution: {
    user: string;
    projectId: string;
    amount: number;
  }[] = [];
  const finalCheck = round.contribution.map((contribution) => {
    return {
      user: contribution.userId,
      projectId: contribution.projectId,
      amount: contribution.usdTotal,
    };
  });

  finalCheck.forEach((contri, index) => {
    if (
      projectMapContribution.findIndex(
        (e) => e.projectId === contri.projectId && e.user === contri.user
      ) >= 0
    ) {
      projectMapContribution[
        projectMapContribution.findIndex(
          (e) => e.projectId === contri.projectId && e.user === contri.user
        )
      ].amount += contri.amount;
    } else {
      projectMapContribution.push(contri);
    }
  });

  round.projectJoinHackathon.forEach((projectJoin) => {
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

  const finalMatch = round.projectJoinHackathon.map((project) => {
    return {
      projectId: project.projectId,
      amount:
        arrOfMatch.filter((e) => e.projectId === project.projectId)[0].sum *
        divisor,
    };
  });

  return finalMatch;
};

export const qfEstimatedHackathon = (
  round: HackathonAllType,
  projectId: string,
  amount: number,
  user: string
): number => {
  const beforeMatchingPool = qfV1Hackathon(round);
  const matchingPool = round.prize_pool;
  let summed = 0;
  const arrOfMatch: {
    // user: string;
    projectId: string;
    sum: number;
  }[] = [];

  const projectMapContributionWithoutEstimate = round.contribution.map(
    (contribution) => {
      return {
        user: contribution.userId,
        projectId: contribution.projectId,
        amount: contribution.usdTotal,
      };
    }
  );

  const projectMapContribution: {
    user: string;
    projectId: string;
    amount: number;
  }[] = [];

  [
    ...projectMapContributionWithoutEstimate,
    { projectId, amount, user },
  ].forEach((contri, index) => {
    if (
      projectMapContribution.findIndex(
        (e) => e.projectId === contri.projectId && e.user === contri.user
      ) >= 0
    ) {
      projectMapContribution[
        projectMapContribution.findIndex(
          (e) => e.projectId === contri.projectId && e.user === contri.user
        )
      ].amount += contri.amount;
    } else {
      projectMapContribution.push(contri);
    }
  });

  round.projectJoinHackathon.forEach((projectJoin) => {
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

  const finalMatch = round.projectJoinHackathon.map((project) => {
    return {
      projectId: project.projectId,
      amount:
        arrOfMatch.filter((e) => e.projectId === project.projectId)[0].sum *
        divisor,
    };
  });

  return (
    finalMatch.filter((e) => e.projectId === projectId)[0].amount -
    beforeMatchingPool.filter((e) => e.projectId === projectId)[0].amount
  );
};

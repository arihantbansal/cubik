import { Prisma } from '@prisma/client';

export type ProjectWithRoundDetailsType = Prisma.ProjectsModelGetPayload<{
  include: {
    ProjectJoinRound: {
      include: {
        fundingRound: true;
      };
    };
  };
}>;

export type RoundWithFundingType = Prisma.ProjectJoinRoundGetPayload<{
  include: {
    fundingRound: true;
  };
}>;

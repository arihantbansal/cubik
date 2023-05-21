import { Prisma } from '@prisma/client';

export type UserWithProjectType = Prisma.UserModelGetPayload<{
  include: {
    project: true;
  };
}>;

export type UserWithProjectRoundDetailsType = Prisma.UserModelGetPayload<{
  include: {
    project: {
      include: {
        ProjectJoinRound: {
          include: {
            fundingRound: true;
          };
        };
      };
    };
  };
}>;

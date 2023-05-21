import { Prisma } from '@prisma/client';

export type UserContributionsWithProjectOwnerAndProjectRound =
  Prisma.ContributionGetPayload<{
    include: {
      ProjectsModel: {
        include: {
          owner: true;
          ProjectJoinRound: {
            include: {
              fundingRound: true;
              project: true;
            };
          };
        };
      };
    };
  }>;

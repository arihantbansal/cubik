import { Prisma } from "@cubik/database";

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

export type getProjectContributorsType = Prisma.ContributionGetPayload<{
  select: {
    id: true;
    total: true;
    usdTotal: true;
    createdAt: true;
    token: true;
    count: true;
    user: true;
  };
}>;

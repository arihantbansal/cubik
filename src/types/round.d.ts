import { Prisma } from '@prisma/client';

export type RoundDetailsWithProjectsWithContributionsType =
  Prisma.RoundGetPayload<{
    include: {
      ProjectJoinRound: {
        include: {
          project: {
            include: {
              owner: true;
            };
          };
        };
      };
      Contribution: {
        include: {
          ProjectsModel: true;
          user: true;
        };
      };
    };
  }>;

export type RoundDetailsWithShortInfoType = Prisma.RoundGetPayload<{
  select: {
    id: true;
    endTime: true;
    startTime: true;
    userId: true;
    matchedPool: true;
    colorScheme: true;
    short_description: true;
    roundName: true;
    registrationEndDate: true;
    registrationStartDate: true;
  };
}>;

import { Prisma } from "@cubik/database";

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

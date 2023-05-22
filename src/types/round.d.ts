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

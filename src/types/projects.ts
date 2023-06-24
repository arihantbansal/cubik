import { Prisma } from '@prisma/client';

export type verifiedProjectsType = Prisma.ProjectJoinRoundGetPayload<{
  select: {
    id: true;
    status: true;
    amountRaise: true;
    fundingRound: {
      select: {
        id: true;
        colorScheme: true;
        active: true;
        endTime: true;
        roundName: true;
        startTime: true;
      };
    };
    project: {
      select: {
        id: true;
        industry: true;
        logo: true;
        name: true;
        project_link: true;
        short_description: true;
        owner: true;
        Contribution: {
          select: {
            user: {
              select: {
                profilePicture: true;
              };
            };
          };
        };
      };
    };
  };
}>;

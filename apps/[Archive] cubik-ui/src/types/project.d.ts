import { Prisma } from "@cubik/database";

export type ProjectWithRoundDetailsWithContributionWithUserType =
  Prisma.ProjectsModelGetPayload<{
    include: {
      ProjectJoinRound: {
        include: {
          fundingRound: {
            include: {
              Contribution: {
                include: {
                  user: true;
                };
              };
            };
          };
        };
      };
    };
  }>;

export type ProjectWithRoundDetailsWithOwnerWithTeamType =
  Prisma.ProjectsModelGetPayload<{
    include: {
      ProjectJoinRound: {
        include: {
          fundingRound: true;
        };
      };
      owner: true;
      Team: {
        include: {
          user: true;
        };
      };
    };
  }>;

export type projectWithFundingRoundType = Prisma.ProjectsModelGetPayload<{
  include: {
    ProjectJoinRound: {
      include: {
        fundingRound: true;
      };
    };
  };
}>;

export type projectWithFundingRoundWithContributorsType =
  Prisma.ProjectsModelGetPayload<{
    include: {
      ProjectJoinRound: {
        include: {
          fundingRound: true;
        };
      };
      Contribution: {
        include: {
          user: true;
        };
      };
    };
  }>;

export type RoundWithFundingType = Prisma.ProjectJoinRoundGetPayload<{
  include: {
    fundingRound: true;
  };
}>;

export type ProjectJoinRoundWithContributionsType =
  Prisma.ProjectJoinRoundGetPayload<{
    include: {
      fundingRound: {
        include: {
          Contribution: {
            include: {
              user: true;
            };
          };
        };
      };
    };
  }>;

export type ContributionsWithUserType = Prisma.ContributionGetPayload<{
  include: {
    user: true;
  };
}>;

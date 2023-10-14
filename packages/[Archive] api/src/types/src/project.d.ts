import { Prisma } from "@cubik/database";

export type ProjectWithCommentsAndRoundsType = Prisma.ProjectsModelGetPayload<{
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

export type ProjectCreatorTeamType = Prisma.TeamGetPayload<{
  include: {
    user: true;
  };
}>;

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

// ****************************************************** //

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
        owner: {
          select: {
            username: true;
          };
        };
        isArchive: true;
        Contribution: {
          select: {
            id: true;
            user: {
              select: {
                profilePicture: true;
                username: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export type searchProjectsType = Prisma.ProjectsModelGetPayload<{
  select: {
    id: true;
    name: true;
    logo: true;
    owner: {
      select: {
        username: true;
      };
    };
  };
}>;

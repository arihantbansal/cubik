import { Prisma, ProjectJoinRoundStatus } from '@prisma/client';

type ProjectCommon = {
  id: string;
  status: ProjectJoinRoundStatus;
  amountRaise: number | null;
  fundingRound: {
    id: string;
    colorScheme: string;
    active: boolean;
    endTime: Date;
    roundName: string;
    startTime: Date;
  };
};

type ProjectNonMobile = ProjectCommon & {
  project: {
    id: string;
    name: string;
    industry: string;
    logo: string;
    project_link: string;
    owner: {
      username: string;
    };
    isArchive: boolean;
    short_description: string;
    Contribution: {
      id: string;
      user: {
        profilePicture: string;
        username: string;
      };
    }[];
  };
};

type ProjectMobile = ProjectCommon & {
  project: {
    id: string;
    name: string;
    industry: string;
    logo: string;
    project_link: string;
    owner: {
      username: string;
    };
    isArchive: boolean;
  };
};

export type verifiedProjectsType = ProjectNonMobile[] | ProjectMobile[];

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

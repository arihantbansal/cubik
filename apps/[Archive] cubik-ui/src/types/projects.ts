import { Prisma, ProjectJoinRoundStatus } from "@cubik/database";

interface ProjectCommon {
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
}

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

export interface ProjectExplorerCard {
  name: string;
  logo: string;
  industry: string;
  startTime: Date;
  endTime: Date;
  projectId: string;
  joinId?: string;
  ownerUsername: string;
  stats?: ProjectJoinRoundStatus;
  amountRaised: number;
  projectDescription: string;
  colorScheme: string;
}

export type ProjectProfileCard = Prisma.ProjectsModelGetPayload<{
  select: {
    id: true;
    industry: true;
    name: true;
    logo: true;
    short_description: true;
    isArchive: true;
    status: true;
    project_link: true;
  };
}>;

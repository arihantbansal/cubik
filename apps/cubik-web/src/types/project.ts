import type { Prisma } from '@cubik/database';

export type ProjectLayoutType = Prisma.ProjectGetPayload<{
  select: {
    id: true;
    name: true;
    shortDescription: true;
    mutliSigAddress: true;
    projectLink: true;
    logo: true;
  };
}>;

export type ProjectPageEventType = {
  eventId: string;
  name: string;
  joinId: string;
  eventType: 'round' | 'hackathon';
  startTime: Date;
  endTime: Date;
};

export interface ProjectPageLayoutType extends ProjectLayoutType {
  events: ProjectPageEventType[];
}

export type ProjectPageDetailsType = Prisma.ProjectGetPayload<{
  select: {
    id: true;
    industry: true;
    name: true;
    longDescription: true;
    discordLink: true;
    twitterHandle: true;
    telegramLink: true;
    githubLink: true;
    projectLink: true;
    slides: true;
  };
}>;

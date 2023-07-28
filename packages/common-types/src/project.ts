export type ExplorerType = 'round' | 'hackathon';

enum event {
  HACKATHON = 'hackathon',
  ROUND = 'round',
  MISC = 'misc',
}
export type HackathonEvent = {
  id: string;
  eventName: 'hackathon';
  amount: number;
  name: string;
  hackathonStart: Date;
  hackathonEnd: Date;
  bg: string;
  color?: string;
  start: Date;
  end: Date;
};

export type RoundEvent = {
  id: string;
  eventName: 'round';
  amount: number;
  name: string;
  registrationStart?: Date;
  registrationEnd?: Date;
  bg?: string;
  color: string;
  start: Date;
  end: Date;
};

export type UnknownEvent = {
  id: string;
  eventName: 'unknown';
  bg?: string;
  color?: string;
  start: Date;
  end: Date;
  amount: number;
  name: string;
};

export type EventType = HackathonEvent | RoundEvent | UnknownEvent;

export interface ProjectExplorerType {
  id: string;
  logo: string;
  title: string;
  projectShortDescription: string;
  ownerName: string;
  industry: string;
  contributorCount: number;
  projectEvent: EventType;
  contributors: {
    user: {
      profilePicture: string;
    };
  }[];
}

export interface ProjectExploreBanner {
  id: string;
  name: string;
  shortDescription?: string;
  matchingPool: number;
  startTime: Date;
  endTime: Date;
  type: ExplorerType;
  bgImage?: string;
  colorScheme?: string;
}

export interface explorerType {
  banner: ProjectExploreBanner[];
  projects: ProjectExplorerType[];
}

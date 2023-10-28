export type ExplorerType = 'round' | 'hackathon';

export interface HackathonEvent {
  id: string;
  eventName: 'hackathon';
  amount: number;
  name: string;
  hackathonStart: Date;
  hackathonEnd: Date;
  bg: string;
  color?: string;
  votingStart: Date;
  votingEnd: Date;
  tracks: any[];
}

export interface RoundEvent {
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
}

export interface UnknownEvent {
  id: string;
  eventName: 'unknown';
  bg?: string;
  color?: string;
  start: Date;
  end: Date;
  amount: number;
  name: string;
}

export type EventType = HackathonEvent | RoundEvent | UnknownEvent;

export interface ProjectExplorerType {
  id: string;
  logo: string;
  title: string;
  slug: string;
  projectShortDescription: string;
  ownerName: string;
  industry: string;
  contributorCount: number;
  projectEvent: EventType;
  contributors: {
    user: {
      profilePicture: string | null;
    };
  }[];
}

export interface ProjectExploreBanner {
  id: string;
  name: string;
  shortDescription?: string;
  matchingPool: number;
  submissionEndDate: Date;
  startTime: Date;
  endTime: Date;
  type: ExplorerType;
  bgImage?: string;
  colorScheme?: string;
  hackathonTracks?: string[];
}

export interface explorerType {
  banner: ProjectExploreBanner[];
  projects: ProjectExplorerType[];
}

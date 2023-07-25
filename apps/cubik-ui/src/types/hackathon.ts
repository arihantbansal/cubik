import type { Prisma } from '@cubik/database';

export interface HackathonHost {
  name: string;
  wallet: string;
  avatar: string;
}

export interface HackathonSchedule {
  registration: {
    start: Date;
    end: Date;
  };
  hackathon: {
    start: Date;
    end: Date;
  };
  voting: {
    start: Date;
    end: Date;
  };
  results: {
    start: Date;
    end: Date;
  };
}

export interface HackathonPrize {
  name: string;
  logo: string;
  amount: number;
}
export interface HackathonPoolSponsors {
  name: string;
  logo: string;
  amount: number;
}
export interface HackathonSponsor {
  name: string;
  logo: string;
}

export interface HackathonLinks {
  label: string;
  link: string;
}

export interface HackathonTracks {
  trackName: string;
  trackDescription: string;
  links: HackathonLinks[];
  trackPrizes: HackathonPrize[];
}

export interface HackathonSocial {
  type: 'TWITTER' | 'DISCORD' | 'GITHUB' | 'LINKEDIN' | 'OTHER';
  icon_link: string;
  link: string;
}

export type HackathonGetAll = Prisma.HackathonGetPayload<{
  select: {
    name: true;
    id: true;
    background: true;
    logo: true;
    short_description: true;
    prize_pool: true;
    timeline: true;
  };
}>;

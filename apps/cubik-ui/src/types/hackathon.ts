import { Prisma } from '@cubik/database';

export type HackathonHost = {
  name: string;
  wallet: string;
  avatar: string;
};

export type HackathonSchedule = {
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
};

export type HackathonPrize = {
  name: string;
  logo: string;
  amount: number;
};
export type HackathonPoolSponsors = {
  name: string;
  logo: string;
  amount: number;
};

export type HackathonTracks = {
  trackName: string;
  trackDescription: string;
  trackPrizes: HackathonPrize[];
};

export type HackathonSocial = {
  type: 'TWITTER' | 'DISCORD' | 'GITHUB' | 'LINKEDIN' | 'OTHER';
  icon_link: string;
  link: string;
};

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


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
  description: string;
  amount: number;
  type: 'BANNER' | 'SPONSOR';
};

export type HackathonSocails = {
  type: 'TWITTER' | 'DISCORD' | 'GITHUB' | 'LINKEDIN' | 'OTHER';
  icon_link: string;
  link: string;
};

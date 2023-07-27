export type ExplorerType = 'round' | 'hackathon';

export interface ProjectExplorerType {
  logo: string;
  title: string;
  ownerName: string;
  industry: string;
  amount: number;
  contributorCount: number;
  contributors: string[];
  count: string;
  type: ExplorerType;
  projectJoinRound?: {
    id: string;
    name: string;
    color: string;
  };
  projectJoinHackathon?: {
    id: string;
    name: string;
    bgImage: string;
  };
}

export interface ProjectExploreBanner {
  id: string;
  name: string;
  matchingPool: number;
  endTime: Date;
  type: ExplorerType;
  bgImage?: string;
}

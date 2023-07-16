export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  category: string;
  ownerId: string;
  contributorIds: string[];
  currentRound: FundingRound;
  previousRounds: FundingRound[];
  currentAmountRaised: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FundingRound {
  roundNumber?: number;
  roundDetails?: any; // round details will go here
  totalRaised: number;
  contributions: number;
  matchedAmount?: number;
  estimatedTotalRaised?: number;
  estimatedMatchingPool?: number;
}

export interface Organization {
  name: string;
  logo: string;
  url: string;
}

export interface Link {
  title: string;
  url: string;
}

export interface PrizeValue {
  value: number;
  unit: string;
}

export interface PrizeBreakdown {
  name: string;
  value: string;
}

export interface OtherPrize {
  name: string;
  prize: string;
}

export interface JudgeOrOwner {
  name: string;
  userId?: string;
  position?: string;
  url?: string;
}

export interface Workshop {
  title: string;
  description: string;
  time: Date;
}

export type sponsorType = [
  {
    // general info
    id: string;
    name: string;
    description: string;
    sponsorOrganizations: Organization[];
    links: Link[];

    prize: PrizeValue[];
    prizeBreakdown?: PrizeBreakdown[];
    otherPrize?: OtherPrize[];
    ideas?: string[];
    requirements?: string[];
    judges?: JudgeOrOwner[];
    ownerOfTrack: JudgeOrOwner[];
    resources?: Link[];

    // contact info
    contactPerson?: string;
    email?: string;
    phone?: string;

    // branding
    brandColors?: string[];
    brandGuidelines?: string;

    // financial
    sponsorshipAmount?: number;
    paymentStatus?: "Paid" | "Pending" | "Overdue";
    paymentMethod?: string;

    // engagement
    workshops?: Workshop[];

    // feedback & metrics
    feedback?: string;
    engagementMetrics?: {
      pageVisits?: number;
      workshopAttendance?: number;
    };

    // social media & promotion
    socialMediaHandles?: {
      twitter?: string;
      facebook?: string;
      linkedIn?: string;
      github?: string;
      discord?: string;
      youtube?: string;
      misc?: string;
    };
    promotionalCode?: string;

    // legal & agreements
    contractSigned?: boolean;
    termsAndConditions?: string;

    // tier & categories
    sponsorshipTier?: "Platinum" | "Gold" | "Silver" | "Bronze";
    categories?: [];

    // history & engagement
    previousParticipation?: boolean;
    futureInterest?: boolean;

    // miscellaneous
    notes?: string;
    attachments?: string[]; // URLs or paths to files
  }
];

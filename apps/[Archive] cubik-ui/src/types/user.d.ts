import type { Prisma } from "@cubik/database";
import type { ProofType } from "~/utils/program/contract";

export interface ProfileNftType {
  name: string;
  address: string;
  collection: string;
}

export type UserWithProjectType = Prisma.UserModelGetPayload<{
  include: {
    project: true;
  };
}>;

export type UserWithProjectRoundDetailsType = Prisma.UserModelGetPayload<{
  include: {
    project: {
      include: {
        ProjectJoinRound: {
          include: {
            fundingRound: true;
          };
        };
      };
    };
  };
}>;

export interface UserProof {
  name: ProofType;
  timestamp: Date;
  tx: string;
  githubUsername?: string;
  verificationId?: string;
}

import { Prisma } from 'database';
import { ProofType } from '~/utils/program/contract';

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

export type UserProof = {
  name: ProofType;
  timestamp: Date;
  tx: string;
  githubUsername?: string;
  verificationId?: string;
};

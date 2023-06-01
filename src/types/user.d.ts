import { Prisma } from '@prisma/client';
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
};

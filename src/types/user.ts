import { Prisma } from '@prisma/client';

export type UserWithProjectType = Prisma.UserModelGetPayload<{
  include: {
    project: true;
  };
}>;

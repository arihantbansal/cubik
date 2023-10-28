import type { Prisma } from '@cubik/database';

export type ProjectCommonType = Prisma.ProjectGetPayload<{
  select: {
    id: true;
    name: true;
    logo: true;
    projectLink: true;
    status: true;
    shortDescription: true;
  };
}>;

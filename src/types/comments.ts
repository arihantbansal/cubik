import { Prisma } from '@prisma/client';

export type getCommentType = Prisma.CommentsGetPayload<{
  select: {
    _count: true;
    comment: true;
    id: true;
    reactions: true;
    user: true;
    createdAt: true;
  };
}>;

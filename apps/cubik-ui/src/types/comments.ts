import { Prisma } from 'database';

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

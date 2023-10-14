import { Prisma } from "@cubik/database";

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

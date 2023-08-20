"use server";

import { prisma } from "@cubik/database";

export const fetchComment = (id: string) => {
  try {
    const res = prisma.comments.findMany({
      where: {
        projectId: id,
      },
      include: {
        user: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createComment = async ({
  comment,
  userId,
  projectId,
}: {
  comment: string;
  userId: string;
  projectId: string;
}) => {
  try {
    const res = await prisma.comments.create({
      data: {
        comment: comment,
        userId: userId,
        projectId: projectId,
        reactions: [],
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

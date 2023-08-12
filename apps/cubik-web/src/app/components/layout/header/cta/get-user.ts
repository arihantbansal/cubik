"use server";
import { prisma } from "@cubik/database";
import { redirect } from "next/navigation";

export const getOrCreateUser = async (publicKey: string) => {
  const user = await prisma.user.findUnique({
    where: {
      mainWallet: publicKey,
    },
    select: {
      username: true,
      profilePicture: true,
    },
  });

  if (!user?.username) return null;
  else if (user) return user;
  else {
    await prisma.user.create({
      data: {
        mainWallet: publicKey,
      },
    });

    return null;
  }
};

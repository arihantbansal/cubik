'use server';

import type { NFTProfile } from '@/types/NFTProfile';

import { prisma } from '@cubik/database';

export const createUser = async (
  publicKey: string,
  username: string,
  pfp: string,
  profileNFT: NFTProfile,
  txId: string,
) => {
  try {
    const res = await prisma.user.upsert({
      where: {
        mainWallet: publicKey,
      },
      create: {
        username: username,
        profilePicture: pfp,
        profileNft: profileNFT || {},
        tx: txId,
        mainWallet: publicKey,
      },
      update: {
        username: username,
        profilePicture: pfp,
        profileNft: profileNFT || {},
        tx: txId,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

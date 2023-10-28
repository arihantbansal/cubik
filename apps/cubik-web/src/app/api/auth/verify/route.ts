import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import { getTrackInfo } from '@/utils/helpers/track';
import { utils, web3 } from '@coral-xyz/anchor';

import { createToken, verifyMessage } from '@cubik/auth';
import type { AuthPayload } from '@cubik/common-types';
import { prisma } from '@cubik/database';

export const POST = async (req: NextRequest) => {
  try {
    const { signature, publicKey } = await req.json();
    const headersList = headers();
    const nonce = headersList.get('x-cubik-nonce') as string;

    const hash = nonce + env.SECRET?.slice(0, 10);
    const check = utils.sha256.hash(hash);

    const result = verifyMessage(
      signature,
      new web3.PublicKey(publicKey),
      check,
    );
    if (result) {
      const user = await prisma.user.findUnique({
        where: {
          mainWallet: publicKey,
        },
      });

      if (!user) {
        return NextResponse.json(
          {
            data: false,
            error: 'User not found',
          },
          {
            status: 400,
            statusText: 'User not found',
          },
        );
      }
      const trackInfo = await getTrackInfo();
      const session = await createToken({
        ip: trackInfo?.ip as string,
        mainWallet: publicKey,
        id: user.id,
        profilePicture: user.profilePicture as string,
        username: user.username as string,
        profileNft: user.profileNft as any,
      });

      const userSessionPayload: AuthPayload = {
        ip: trackInfo?.ip as string,
        mainWallet: publicKey,
        id: user.id,
        profilePicture: user.profilePicture as string,
        username: user.username as string,
        profileNft: user.profileNft as any,
      };

      const response = NextResponse.json({
        data: result,
        user: userSessionPayload,
        error: null,
      });

      response.cookies.set('authToken', session as string, {
        expires: new Date(Date.now() + 3600000),
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      });

      await prisma.session.create({
        data: {
          userId: user.id,
          ipAddress: trackInfo?.ip as string,
          userAgent: trackInfo?.userAgent as string,
          country: trackInfo?.country as string,
          latitude: trackInfo?.latitude as string,
          longitude: trackInfo?.longitude as string,
          createdAt: new Date(),
        },
      });

      return response;
    } else {
      return NextResponse.json({
        data: result,
        error: 'Error verifying signature',
      });
    }
  } catch (error) {
    console.log(error);
    NextResponse.json(
      {
        data: false,
        error: 'Error verifying signature',
      },
      {
        status: 500,
        statusText: 'Error verifying signature',
      },
    );
  }
};

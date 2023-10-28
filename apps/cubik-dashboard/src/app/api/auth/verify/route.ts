import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import { utils, web3 } from '@coral-xyz/anchor';

import { verifyMessage } from '@cubik/auth';
import { createToken } from '@cubik/auth/src/admin';
import { AccessScope, AuthPayload } from '@cubik/common-types/src/admin';
import { prisma } from '@cubik/database';

export const POST = async (req: NextRequest) => {
  const { signature, publicKey } = await req.json();
  const headersList = headers();
  const nonce = headersList.get('x-cubik-nonce') as string;

  const hash = nonce + env.SECRET_ADMIN?.slice(0, 10);
  const check = utils.sha256.hash(hash);

  if (!signature || !publicKey || !nonce) {
    return NextResponse.json(
      {
        error: 'Missing params',
      },
      {
        status: 400,
        statusText: 'Missing params',
      },
    );
  }
  try {
    const result = verifyMessage(
      signature,
      new web3.PublicKey(publicKey),
      check,
    );
    if (!result) {
      return NextResponse.json(
        {
          error: 'Verification failed',
        },
        {
          status: 400,
          statusText: 'Verification failed',
        },
      );
    }

    const user = await prisma.adminAccess.findMany({
      where: {
        user: {
          mainWallet: publicKey,
          isActive: true,
          isArchive: false,
        },
        isActive: true,
      },
      select: {
        roundId: true,
        hackathonId: true,
        user: true,
        hackathon: {
          select: {
            name: true,
          },
        },
        round: {
          select: {
            name: true,
          },
        },
      },
    });
    if (user.length > 0) {
      const accessScope: AccessScope[] = [];

      user.forEach((e) =>
        accessScope.push({
          event_id: e.roundId || (e.hackathonId as string),
          event_name: e.roundId
            ? (e.round?.name as string)
            : (e.hackathon?.name as string),
          event_type: e.roundId ? 'grant' : 'hackathon',
        }),
      );

      const session = await createToken({
        mainWallet: publicKey,
        id: user[0].user.id,
        profilePicture: user[0].user.profilePicture as string,
        username: user[0].user.username as string,
        profileNft: user[0].user.profileNft as any,
        accessScope: accessScope,
        accessType: 'ADMIN',
      });

      const userSessionPayload: AuthPayload = {
        mainWallet: publicKey,
        id: user[0].user.id,
        profilePicture: user[0].user.profilePicture as string,
        username: user[0].user.username as string,
        profileNft: user[0].user.profileNft as any,
        accessScope: accessScope,
        accessType: 'ADMIN',
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

      return response;
    } else {
      return NextResponse.json({
        error: "User Doesn't have access",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        data: false,
        error: 'Error while making message',
      },
      {
        status: 500,
        statusText: 'Error while making message',
      },
    );
  }
};

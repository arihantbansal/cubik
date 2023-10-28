import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getTrackInfo } from '@/utils/helpers/track';

import { decodeToken } from '@cubik/auth';
import type { AuthCheckReturn } from '@cubik/common-types';
import { prisma } from '@cubik/database';

export const POST = async (req: NextRequest) => {
  try {
    const { wallet } = await req.json();

    const cookieStore = cookies();
    const authCookie = cookieStore.get('authToken');

    let returnData: AuthCheckReturn = {
      data: null,
      error: null,
    };

    if (!authCookie) {
      const user = await prisma.user.findFirst({
        where: {
          mainWallet: wallet as string,
        },
      });
      // no user then add a user
      if (!user) {
        await prisma.user.create({
          data: {
            mainWallet: wallet as string,
          },
        });
        returnData = {
          data: {
            type: 'NEW_WALLET',
          },
          error: null,
        };
        return NextResponse.json(returnData, {
          status: 200,
        });
      }
      // user exists and create one
      if (user && !user?.username) {
        returnData = {
          data: {
            type: 'EXISTING_WALLET',
          },
          error: null,
        };
        return NextResponse.json(returnData, {
          status: 200,
        }); // user wallet not created
      }
      returnData = {
        data: {
          type: 'USER_FOUND',
        },
        error: null,
      };

      return NextResponse.json(returnData, {
        status: 200,
      });
    } else {
      const decodedToken = await decodeToken(authCookie.value);
      const trackInfo = await getTrackInfo();
      if (
        !decodedToken ||
        decodedToken.mainWallet !== wallet ||
        decodedToken?.ip !== trackInfo?.ip
      ) {
        return NextResponse.json({
          data: null,
          error: 'INVALID_TOKEN',
        }).cookies.delete('authToken');
      }

      returnData = {
        data: {
          type: 'AUTHENTICATED_USER',
          user: decodedToken,
        },
        error: null,
      };
      return NextResponse.json(returnData, {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};

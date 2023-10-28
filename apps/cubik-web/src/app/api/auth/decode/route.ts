import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { decodeToken } from '@cubik/auth';

export const GET = async () => {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('authToken');

  if (!authCookie?.value) {
    return NextResponse.json(
      {
        data: null,
        error: 'No auth token found',
      },
      {
        status: 400,
        statusText: 'No auth token found',
      },
    );
  }

  try {
    const decodedToken = await decodeToken(authCookie?.value);
    if (!decodedToken) {
      return NextResponse.json(
        {
          data: null,
          error: 'INVALID_TOKEN',
        },
        {
          status: 400,
          statusText: 'INVALID_TOKEN',
        },
      );
    }
    return NextResponse.json({
      data: decodedToken,
      error: null,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        data: null,
        error: 'INTERNAL_SERVER_ERROR',
      },
      {
        status: 500,
        statusText: 'INTERNAL_SERVER_ERROR',
      },
    );
  }
};

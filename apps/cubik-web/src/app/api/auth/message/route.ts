import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import { utils } from '@coral-xyz/anchor';

export async function POST() {
  try {
    const headersList = headers();
    const nonce = headersList.get('x-cubik-nonce') as string;
    const hash = nonce + env.SECRET?.slice(0, 10);
    const check = utils.sha256.hash(hash);
    return NextResponse.json({
      hash: check,
    });
  } catch (error) {
    console.log(error);
    NextResponse.json(
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
}

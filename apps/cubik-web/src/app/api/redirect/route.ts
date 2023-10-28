import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
      throw new Error('No url provided');
    }

    return NextResponse.redirect(decodeURIComponent(url));
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: 'Something went wrong',
    });
  }
}

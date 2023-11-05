import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { get } from '@vercel/edge-config';





// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const isWebInMaintenanceMode = await get<boolean>('isWebInMaintenanceMode');
  console.log(isWebInMaintenanceMode);
  if (!isWebInMaintenanceMode) {
    console.log('ff');
    return NextResponse.rewrite(new URL('/maintenance', req.url));
  }
  return NextResponse.next();
}

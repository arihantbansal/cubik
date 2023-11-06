import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { get } from '@vercel/edge-config';

export async function middleware(req: NextRequest) {
  const isDashboardInMaintenanceMode = await get<boolean>(
    'isDashboardInMaintenanceMode',
  );
  console.log(isDashboardInMaintenanceMode);
  if (!isDashboardInMaintenanceMode) {
    return NextResponse.rewrite(new URL('/maintenance', req.url));
  }
  return NextResponse.next();
}

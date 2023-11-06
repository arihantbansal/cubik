import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { get } from '@vercel/edge-config';

export async function middleware(req: NextRequest) {
  const isWebInMaintenanceMode = await get<boolean>('isWebInMaintenanceMode');
  if (!isWebInMaintenanceMode) {
    console.log('ff');
    return NextResponse.rewrite(new URL('/maintenance', req.url));
  }
  return NextResponse.next();
}

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async () => {
  try {
    const cookieStore = cookies();
    cookieStore.delete('authToken');
    return NextResponse.json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Something went wrong',
    });
  }
};

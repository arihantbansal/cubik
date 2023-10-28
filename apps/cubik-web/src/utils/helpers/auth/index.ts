import { env } from '@/env.mjs';
import type { AuthTokenCheckReturn } from '@/types/auth';

export const handleLogout = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return 'success';
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getToken = async () => {
  try {
    const res = await fetch(env.NEXT_PUBLIC_BACKEND + '/auth/token', {
      cache: 'no-cache',
      method: 'GET',
    });
    const data = (await res.json()) as AuthTokenCheckReturn;
    if (data.error ?? !data.data) {
      return null;
    }
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMessage = async (nonce: string) => {
  try {
    const res = await fetch('/api/auth/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cubik-nonce': nonce,
      },
    });
    const data = await res.json();
    return data.hash;
  } catch (error) {
    console.log(error);
    return null;
  }
};

import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession(opts);

  return {
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

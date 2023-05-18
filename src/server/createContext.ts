import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerAuthSession } from './utils/auth';

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerAuthSession({ req, res });

  return {
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { authHandler } from './utils/authHandler';

export const createContext = async ({ req }: CreateNextContextOptions) => {
  const user = await authHandler(req.headers.authorization);
  return {
    user,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

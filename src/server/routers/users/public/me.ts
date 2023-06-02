import { signOut } from 'next-auth/react';
import { z } from 'zod';
import { procedure } from '~/server/trpc';

export const getMe = procedure
  .input(
    z.object({
      connected: z.boolean().optional(),
      wallet: z.string().optional(),
    })
  )
  .query(async ({ input, ctx }) => {
    const { session } = ctx;

    if (!session) return;

    if (!input.connected || !input.wallet) {
      return signOut({
        redirect: false,
      });
    }

    return session.user;
  });

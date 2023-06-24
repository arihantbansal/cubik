import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from '~/server/createContext';
import { appRouter } from '../../../server/routers/_app';

export const config = {
  api: {
    responseLimit: '8mb',
  },
};
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
});

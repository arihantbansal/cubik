import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter, createTRPCContext } from "@cubik/api";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  batching: {
    enabled: true,
  },
});

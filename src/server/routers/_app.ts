import { z } from "zod";
import { procedure, router } from "../trpc";
import { userRouter } from "./user";

export const appRouter = router({
  ping: procedure.query(() => "Its working 🚀"),
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

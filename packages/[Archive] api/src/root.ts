import { createTRPCRouter } from "./trpc";
import {
  projectRouter,
  userRouter,
  contributionRouter,
  hackathonRouter,
  roundRouter,
  poolRouter,
  commentRouter,
} from "./router";

export const appRouter = createTRPCRouter({
  user: userRouter,
  project: projectRouter,
  contribution: contributionRouter,
  hackathon: hackathonRouter,
  round: roundRouter,
  pool: poolRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

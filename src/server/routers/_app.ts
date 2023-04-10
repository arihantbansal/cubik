import { procedure, router } from '../trpc';
import { commentRouter } from './comment';
import { projectsRouter } from './projects';
import { userRouter } from './user';

export const appRouter = router({
  ping: procedure.query(() => 'Its working 🚀'),
  user: userRouter,
  project: projectsRouter,
  comment: commentRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

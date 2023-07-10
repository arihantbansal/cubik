import { createTRPCRouter } from '~/trpc';
import { checkUsername, create, findOne, search } from './public';
export const userRouter = createTRPCRouter({
  checkUsername,
  create,
  findOne,
  search,
});

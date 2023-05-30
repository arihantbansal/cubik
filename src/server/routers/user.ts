import { router } from '../trpc';
import { checkUsername, createUser, findOneUser } from './users';
import { searchUser } from './users/public/searchUser';

export const userRouter = router({
  create: createUser,
  findOne: findOneUser,
  searchUser: searchUser,
  checkUsername: checkUsername,
});

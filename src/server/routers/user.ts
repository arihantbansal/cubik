import { router } from '../trpc';
import {
  addProof,
  checkEmail,
  checkUsername,
  createUser,
  findOneUser,
  getMe,
  searchUser,
} from './users';

export const userRouter = router({
  create: createUser,
  findOne: findOneUser,
  searchUser: searchUser,
  checkUsername: checkUsername,
  addProof: addProof,
  getMe: getMe,
  checkEmail: checkEmail,
});

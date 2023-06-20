import { router } from '../trpc';
import {
  addProof,
  checkEmail,
  checkProof,
  checkUsername,
  createUser,
  findOneUser,
  findOneWithProjectAndRoundDetails,
  getMe,
  searchUser,
} from './users';

export const userRouter = router({
  create: createUser,
  findOne: findOneUser,
  findOneWithProjectAndRoundDetails: findOneWithProjectAndRoundDetails,
  searchUser: searchUser,
  checkUsername: checkUsername,
  addProof: addProof,
  getMe: getMe,
  checkEmail: checkEmail,
  checkProof: checkProof,
});

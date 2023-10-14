import { createTRPCRouter } from "../../trpc";
import {
  addProof,
  checkProof,
  dripProof,
  findOneWithProjectAndRoundDetails,
} from "./protected";
import { checkEmail, checkUsername, create, findOne, search } from "./public";

export const userRouter = createTRPCRouter({
  checkUsername,
  create,
  findOne,
  search,
  checkEmail: checkEmail,
  findOneWithProjectAndRoundDetails: findOneWithProjectAndRoundDetails,
  dripProof: dripProof,
  addProof: addProof,
  checkProof: checkProof,
});

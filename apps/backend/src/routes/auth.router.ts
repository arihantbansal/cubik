/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  check,
  logout,
  verify,
  getMessage,
  getDecodedToken,
} from "controllers/auth.controller";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/check", check);
authRouter.post("/logout", logout);
authRouter.post("/verify", verify);
authRouter.get("/create-message", getMessage);
authRouter.get("/decode", getDecodedToken);

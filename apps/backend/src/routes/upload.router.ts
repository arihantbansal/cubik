import { Router } from "express";
import { uploadController } from "controllers/upload.controller";

export const uploadRouter = Router();

uploadRouter.post("/", uploadController);


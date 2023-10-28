import { uploadFromURL } from 'controllers/upload.controller';
import { Router } from 'express';
import { validate } from 'middleware/validate';
import { uploadFromURLSchema } from 'schema/upload';

export const uploadRouter = Router();

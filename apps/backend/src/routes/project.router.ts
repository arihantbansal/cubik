import { projectExplorer } from '../controllers/projects.contoller';
import { Router } from 'express';

export const projectRouter = Router();

projectRouter.get('/explorer', projectExplorer);

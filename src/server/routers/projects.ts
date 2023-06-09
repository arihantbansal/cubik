import {
  Prisma,
  ProjectJoinRoundStatus,
  ProjectVerifyStatus,
} from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Grant } from '~/utils/calculateProjectMatchingFund';
import { procedure, protectedProcedure, router } from '../trpc';
import { prisma } from '../utils/prisma';
import {
  createProject,
  findOneProject,
  joinRound,
  projectAdminDetails,
  projectCount,
  verifiedProjects,
} from './projects/index';
import {
  findAllProject,
  findManyProjects,
  findManyReview,
  findManyVerified,
  findPubkey,
  projectGraph,
  updateProjectStatus,
} from './projects/public';
import { findManyRejected } from './projects/public/findManyRejected';
import { findManyVerifiedWithContributions } from './projects/public/findManyVerifiedWithContributions';
import { projectVisitorsDetail } from './projects/public/projectVisitorsDetail';

export const projectsRouter = router({
  create: createProject,
  findAll: findAllProject,
  findMany: findManyProjects,
  findManyRejected: findManyRejected,
  findManyReview: findManyReview,
  findManyVerified: findManyVerified,
  findManyVerifiedWithContributions: findManyVerifiedWithContributions,
  findOne: findOneProject,
  findPubkey: findPubkey,
  joinRound: joinRound,
  projectAdminDetails: projectAdminDetails,
  projectGraph: projectGraph,
  projectVisitorsDetail: projectVisitorsDetail,
  updateProjectStatus: updateProjectStatus,
  verifiedProjects: verifiedProjects,
  count: projectCount,
});

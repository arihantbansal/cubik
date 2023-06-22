import { router } from '../trpc';
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
  findManyVerifiedUser,
  findOneJoinRound,
  findPubkey,
  findSimilar,
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
  findOneJoinRound: findOneJoinRound,
  findSimilarProjects: findSimilar,
  findManyVerifiedUser: findManyVerifiedUser,
});

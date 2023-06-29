import { router } from '../trpc';
import { get, getAll, participants } from './hackathons';

export const hackathonRouter = router({
  get: get,
  participants: participants,
  getAll: getAll,
});

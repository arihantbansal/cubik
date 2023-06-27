import { router } from '../trpc';
import { get, participants } from './hackathons/public';

export const hackathonRouter = router({
  get: get,
  participants: participants,
});

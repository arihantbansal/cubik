import { router } from '../trpc';
import { get } from './hackathons/public';

export const hackathonRouter = router({
  get: get,
});

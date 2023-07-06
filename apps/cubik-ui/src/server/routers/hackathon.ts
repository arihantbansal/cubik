import { router } from '../trpc';
import {
  get,
  getAll,
  haveRegistered,
  participants,
  registration,
} from './hackathons';

export const hackathonRouter = router({
  get: get,
  participants: participants,
  getAll: getAll,
  registration: registration,
  haveRegistered: haveRegistered,
});

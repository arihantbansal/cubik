import { UserProject } from './userProject';

export type User = {
  id: string;
  username: string;
  mainwallet: string;
  verified: boolean;
  icon: string;
  projects: UserProject[];
};

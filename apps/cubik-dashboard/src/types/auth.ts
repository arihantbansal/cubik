import { AccessScope } from '@cubik/common-types/src/admin';

export interface User {
  id: string;
  username: string;
  profilePicture: string;
  mainWallet: string;
  accessType?: 'GOD' | 'ADMIN';
  accessScope: AccessScope[];
}

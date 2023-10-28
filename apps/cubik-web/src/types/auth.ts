import type { JwtPayload } from 'jsonwebtoken';

import type { NFTProfile } from './NFTProfile';

export type AuthPayload = {
  id: string;
  username: string;
  profilePicture: string;
  mainWallet: string;
  profileNft?: NFTProfile;
  ip: string;
} & JwtPayload;

export interface AuthCheckReturn {
  data: {
    user?: AuthPayload | null;
    type:
      | 'NEW_WALLET'
      | 'EXISTING_WALLET'
      | 'USER_FOUND'
      | 'AUTHENTICATED_USER';
  } | null;
  error: string | null;
}

export interface AuthVerifyReturn {
  data: boolean;
  user?: AuthPayload | null;
  error: string | null;
}

export interface AuthTokenCheckReturn {
  data: string | null;
  error: string | null;
}

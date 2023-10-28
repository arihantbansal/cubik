import type { JwtPayload } from 'jsonwebtoken';

export interface NFTProfile {
  name: string;
  token: string;
  collection: string;
  owner: string;
}

export interface NftResponseCarousel {
  id: string;
  name: string;
  image: string;
  metadataName: string;
  tokenMint: string;
}

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
  accessToken?: string;
  error: string | null;
}

export interface AuthTokenCheckReturn {
  data: string | null;
  error: string | null;
}

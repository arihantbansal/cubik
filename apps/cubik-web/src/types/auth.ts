import type { NFTProfile } from "./NFTProfile";
import type { JwtPayload } from "jsonwebtoken";

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
    accessToken?: string;
    type:
      | "NEW_WALLET"
      | "EXISTING_WALLET"
      | "USER_FOUND"
      | "AUTHENTICATED_USER";
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

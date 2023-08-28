import { NFTProfile } from "./NFTProfile";
import { JwtPayload } from "jsonwebtoken";

export type AuthPayload = {
  id: string;
  username: string;
  profilePicture: string;
  mainWallet: string;
  profileNft?: NFTProfile;
  ip: string;
} & JwtPayload;

export type AuthCheckReturn = {
  data: {
    accessToken?: string;
    type:
      | "NEW_WALLET"
      | "EXISTING_WALLET"
      | "USER_FOUND"
      | "AUTHENTICATED_USER";
  } | null;
  error: string | null;
};


export type AuthVerifyReturn = {
  data: boolean;
  accessToken?: string;
  error: string | null;
};


export type AuthTokenCheckReturn = {
  data: string | null;
  error: string | null;
};

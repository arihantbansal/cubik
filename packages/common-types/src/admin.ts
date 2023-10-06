import { JwtPayload } from "jsonwebtoken";

export type AuthPayload = {
  id: string;
  username: string;
  profilePicture: string;
  mainWallet: string;
  accessType?: "GOD" | "ADMIN";
  accessScope: AccessScope[];
} & JwtPayload;

interface AccessScope {
  event_name: string;
  event_id: string;
  event_type: "hackathon" | "grant";
}

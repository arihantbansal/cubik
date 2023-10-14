import { createTRPCRouter } from "../../trpc";
import { get, getAll, participants } from "./public";
import {
  haveRegistered,
  projectJoinHackathon,
  registration,
} from "./protected";

export const hackathonRouter = createTRPCRouter({
  get: get,
  participants: participants,
  getAll: getAll,
  registration: registration,
  haveRegistered: haveRegistered,
  projectJoinHackathon: projectJoinHackathon,
});

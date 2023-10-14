import { isFuture, isPast } from "date-fns";

export enum GRANT_STATUS {
  notStarted = "NOT_YET_STARTED",
  onGoing = "ONGOING",
  ended = "ENDED",
  invalid = "INVALID",
}

export function checkRoundStatus(startDate: Date, endDate: Date): GRANT_STATUS {
  if (isFuture(startDate)) {
    return GRANT_STATUS.notStarted;
  } else if (isFuture(endDate)) {
    return GRANT_STATUS.onGoing;
  } else if (isPast(endDate)) {
    return GRANT_STATUS.ended;
  }
  return GRANT_STATUS.invalid;
}

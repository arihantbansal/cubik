import luxon from "luxon";

export const parseDate = (date: string) => {
  return luxon.DateTime.fromISO(date).toLocal();
};

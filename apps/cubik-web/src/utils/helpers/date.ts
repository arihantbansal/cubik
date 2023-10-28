import { DateTime } from 'luxon';

export const parseDateISO = (date: string) => {
  return DateTime.fromISO(date).toLocal().toSeconds();
};

type dateType = 'year' | 'month' | 'day' | 'hour' | 'minute';

export const isFutureAndHowMuch = (
  firstTimestamp: number,
  nowTimestamp: number,
): [boolean, number, dateType] => {
  const firstDate = DateTime.fromSeconds(firstTimestamp);
  const nowDate = DateTime.fromSeconds(nowTimestamp);

  if (nowDate > firstDate) {
    const diff = firstDate
      .diff(nowDate, ['years', 'months', 'days', 'hours', 'minutes'])
      .toObject();

    if (diff.years) {
      return [true, diff.years, 'year'];
    }
    if (diff.months) {
      return [true, diff.months, 'month'];
    }
    if (diff.days) {
      return [true, diff.days, 'day'];
    }
    if (diff.hours) {
      return [true, diff.hours, 'hour'];
    }
    if (diff.minutes) {
      return [true, diff.minutes, 'minute'];
    }
  }
  return [false, 0, 'minute'];
};

export const isPastAndHowMuch = (
  nowTimestamp: number,
  secondTimestamp: number,
): [boolean, number, dateType] => {
  const firstDate = DateTime.fromSeconds(nowTimestamp);
  const secondDate = DateTime.fromSeconds(secondTimestamp);

  if (secondDate < firstDate) {
    const diff = firstDate
      .diff(secondDate, ['years', 'months', 'days', 'hours', 'minutes'])
      .toObject();

    if (diff.years) {
      return [true, diff.years, 'year'];
    }
    if (diff.months) {
      return [true, diff.months, 'month'];
    }
    if (diff.days) {
      return [true, diff.days, 'day'];
    }
    if (diff.hours) {
      return [true, diff.hours, 'hour'];
    }
    if (diff.minutes) {
      return [true, diff.minutes, 'minute'];
    }
  }
  return [false, 0, 'minute'];
};

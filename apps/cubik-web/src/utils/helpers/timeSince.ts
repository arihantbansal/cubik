export const timeSince = (date: Date): string => {
  let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000); // Years
  if (interval >= 1) {
    return `${interval} Years ago`;
  }

  interval = Math.floor(seconds / 2592000); // Months
  if (interval >= 1) {
    return `${interval} Months ago`;
  }

  interval = Math.floor(seconds / 86400); // Days
  if (interval >= 1) {
    return `${interval} Days ago`;
  }

  interval = Math.floor(seconds / 3600); // Hours
  if (interval >= 1) {
    return `${interval} Hrs. ago`;
  }

  interval = Math.floor(seconds / 60); // Minutes
  if (interval >= 1) {
    return `${interval} Min. ago`;
  }

  // Seconds
  seconds = Math.floor(seconds);
  if (seconds >= 50) {
    return "A minute ago";
  }

  return `${Math.max(seconds, 0)} seconds ago`; // Ensure we don't return negative seconds
};

export const formatDate = (date: Date): string => {
  const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short' });
  const dayFormatter = new Intl.DateTimeFormat('en', { day: '2-digit' });

  const startMonth = monthFormatter.format(date);
  const startDay = dayFormatter.format(date);

  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 10);
  const endDay = dayFormatter.format(endDate);

  const year = endDate.getFullYear();

  return `${startMonth} ${startDay} - ${endDay}, ${year}`;
};

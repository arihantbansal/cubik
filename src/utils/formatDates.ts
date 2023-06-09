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

export const formateDateInMonths = (date: Date): string => {
  let day = String(date.getDate()).padStart(2, '0'); // prepend 0 if day is a single digit

  let monthIndex = date.getMonth(); // getMonth() is zero-based, so let's make an array of month names
  let monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let monthName = monthNames[monthIndex];

  let year = date.getFullYear();

  let formattedDate = `${day} ${monthName} ${year}`;

  return formattedDate;
};

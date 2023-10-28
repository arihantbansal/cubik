export const formateDateInMonths = (date?: Date | string): string => {
  if (!date) return '';

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  if (
    Object.prototype.toString.call(parsedDate) !== '[object Date]' ||
    isNaN(parsedDate.getTime())
  ) {
    return '';
  }

  const day = String(parsedDate.getDate()).padStart(2, '0');

  const monthIndex = parsedDate.getMonth();
  const monthNames = [
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
  const monthName = monthNames[monthIndex];

  const year = parsedDate.getFullYear();

  const formattedDate = `${day} ${monthName} ${year}`;

  return formattedDate;
};

export function formatNumberWithK(num: number): string {
  if (num >= 1_000_000_000) {
    let numWithDecimal = num / 1_000_000_000;
    let formattedNum = numWithDecimal.toFixed(1);
    if (formattedNum.endsWith('.0')) {
      formattedNum = formattedNum.slice(0, -2);
    }
    return formattedNum + 'B';
  } else if (num >= 1_000_000) {
    let numWithDecimal = num / 1_000_000;
    let formattedNum = numWithDecimal.toFixed(1);
    if (formattedNum.endsWith('.0')) {
      formattedNum = formattedNum.slice(0, -2);
    }
    return formattedNum + 'M';
  } else if (num >= 1000) {
    let numWithDecimal = num / 1000;
    let formattedNum = numWithDecimal.toFixed(1);
    if (formattedNum.endsWith('.0')) {
      formattedNum = formattedNum.slice(0, -2);
    }
    return formattedNum + 'k';
  }

  return new Intl.NumberFormat().format(num);
}

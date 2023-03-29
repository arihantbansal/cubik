export function formatNumberWithK(num: number): string {
  if (num >= 1000) {
    let numWithDecimal = num / 1000;
    let formattedNum = numWithDecimal.toFixed(1);
    if (formattedNum.endsWith('.0')) {
      formattedNum = formattedNum.slice(0, -2);
    }
    return formattedNum + 'k';
  }
  return num.toString();
}

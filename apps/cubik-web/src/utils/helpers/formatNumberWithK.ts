export function formatNumberWithK(num: number): string {
  if (num >= 1_000_000_000) {
    const numWithDecimal = num / 1_000_000_000;
    let formattedNum = numWithDecimal.toFixed(2);
    if (formattedNum.endsWith('.00')) {
      formattedNum = formattedNum.slice(0, -3);
    }
    return formattedNum + 'B';
  } else if (num >= 1_000_000) {
    const numWithDecimal = num / 1_000_000;
    let formattedNum = numWithDecimal.toFixed(2);
    if (formattedNum.endsWith('.00')) {
      formattedNum = formattedNum.slice(0, -3);
    }
    return formattedNum + 'M';
  } else if (num >= 1000) {
    const numWithDecimal = num / 1000;
    let formattedNum = numWithDecimal.toFixed(2);
    if (formattedNum.endsWith('.00')) {
      formattedNum = formattedNum.slice(0, -3);
    }
    return formattedNum + 'k';
  }

  return new Intl.NumberFormat().format(num);
}

export function formatNumberWithComma(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

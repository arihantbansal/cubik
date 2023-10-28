export const ColorSet = [
  {
    border: '#001F26',
    color: '#00D1FF',
  },
  {
    border: '#383301',
    color: '#FFE818',
  },
  {
    border: '#34003E',
    color: '#DC1FFF',
  },
  {
    border: '#003810',
    color: '#18FF59',
  },
  {
    border: '#1B0D2E',
    color: '#9747FF',
  },
];
export const randomColorSet = (n: number) => {
  let result: typeof ColorSet = [];
  for (let i = 0; i < n; i++) {
    result = result.concat(ColorSet);
  }
  return result;
};

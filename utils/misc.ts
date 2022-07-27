export const getPercentage = (value: number, total: number) =>
  total ? (value / total) * 100 : 0;

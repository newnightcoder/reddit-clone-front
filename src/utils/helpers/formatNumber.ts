const formatNumber = (number: number) => {
  const thousand = 1000;
  const million = 1000000;
  if (number >= million) return `${number / million}M`;
  if (number >= thousand) return `${number / thousand}K`;
  return number;
};

export default formatNumber;

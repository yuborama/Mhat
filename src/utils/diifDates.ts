const diffDates = (date1: Date | string, date2: Date | string) => {
  const dateConverted1 = new Date(date1);
  const dateConverted2 = new Date(date2);
  const diff = Math.abs(dateConverted1.getTime() - dateConverted2.getTime());
  const diffYears = Math.ceil(diff / (1000 * 3600 * 24 * 365));
  return diffYears;
};

export default diffDates;

const convertDateWithOptions = (
  date: string,
  locale = 'en-US',
  options?: Intl.DateTimeFormatOptions & { onlyHour?: boolean }
) => {
  const newDate = new Date(date);
  const DateFormat = options?.onlyHour
    ? newDate.toLocaleTimeString(locale, options)
    : newDate.toLocaleString(locale, options);
  return `${DateFormat}`;
};

export default convertDateWithOptions;

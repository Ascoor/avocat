export const normalizeISODate = (value) => {
  if (!value || typeof value !== 'string') return '';
  const match = value.match(/^\d{4}-\d{2}-\d{2}$/);
  return match ? value : '';
};

export const isDateRangeValid = (fromDate, toDate) => {
  if (!fromDate || !toDate) return true;
  return normalizeISODate(fromDate) <= normalizeISODate(toDate);
};

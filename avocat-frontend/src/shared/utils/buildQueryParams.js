const cleanValue = (value) => {
  if (value == null) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  }
  return value;
};

export const buildQueryParams = (filters = {}, schema = {}) => {
  const allowedKeys = new Set(Object.keys(schema.fields || {}));

  return Object.fromEntries(
    Object.entries(filters)
      .filter(([key]) => allowedKeys.has(key))
      .map(([key, value]) => [key, cleanValue(value)])
      .filter(([, value]) => value != null),
  );
};

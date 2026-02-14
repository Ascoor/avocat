const cleanValue = (value) => {
  if (value == null) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  }
  return value;
};

export const buildReportsQueryParams = ({ filters = {}, pagination = {} } = {}) => {
  const params = {
    page: Number(pagination.page || 1),
    per_page: Number(pagination.per_page || 20),
  };

  Object.entries(filters || {}).forEach(([key, rawValue]) => {
    const value = cleanValue(rawValue);
    if (value == null) return;
    params[key] = value;
  });

  return Object.fromEntries(Object.entries(params).filter(([, value]) => value != null));
};

export const parseReportsStateFromSearch = (searchParams, defaults) => {
  const nextFilters = { ...defaults.filters };
  Object.keys(defaults.filters || {}).forEach((key) => {
    const value = searchParams.get(key);
    if (value != null) nextFilters[key] = value;
  });

  return {
    filters: nextFilters,
    pagination: {
      page: Number(searchParams.get('page') || defaults.pagination.page),
      per_page: Number(searchParams.get('per_page') || defaults.pagination.per_page),
    },
  };
};

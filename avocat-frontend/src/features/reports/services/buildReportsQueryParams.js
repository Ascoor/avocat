const cleanValue = (value) => {
  if (value == null) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  }
  return value;
};

export const buildReportsQueryParams = ({ q = '', filters = {}, sort = {}, pagination = {} } = {}) => {
  const params = {
    q: cleanValue(q) || undefined,
    sort_by: cleanValue(sort.sort_by) || 'created_at',
    sort_dir: cleanValue(sort.sort_dir) || 'desc',
    page: Number(pagination.page || 1),
    per_page: Number(pagination.per_page || 20),
  };

  Object.entries(filters || {}).forEach(([key, rawValue]) => {
    const value = cleanValue(rawValue);
    if (value == null) return;
    params[`filters[${key}]`] = value;
  });

  return Object.fromEntries(Object.entries(params).filter(([, value]) => value != null));
};

export const parseReportsStateFromSearch = (searchParams, defaults) => {
  const nextFilters = { ...defaults.filters };
  Object.keys(defaults.filters || {}).forEach((key) => {
    const value = searchParams.get(`filters[${key}]`);
    if (value != null) nextFilters[key] = value;
  });

  return {
    q: searchParams.get('q') || defaults.q || '',
    filters: nextFilters,
    sort: {
      sort_by: searchParams.get('sort_by') || defaults.sort.sort_by,
      sort_dir: searchParams.get('sort_dir') || defaults.sort.sort_dir,
    },
    pagination: {
      page: Number(searchParams.get('page') || defaults.pagination.page),
      per_page: Number(searchParams.get('per_page') || defaults.pagination.per_page),
    },
  };
};

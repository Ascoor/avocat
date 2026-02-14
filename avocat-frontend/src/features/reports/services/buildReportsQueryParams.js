import { buildQueryParams } from '@shared/utils/buildQueryParams';

export const buildReportsQueryParams = (
  { filters = {}, pagination = {} } = {},
  schema = {},
) => {
  const params = {
    page: Number(pagination.page || 1),
    per_page: Number(pagination.per_page || 20),
    ...buildQueryParams(filters, schema),
  };

  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value != null),
  );
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
      per_page: Number(
        searchParams.get('per_page') || defaults.pagination.per_page,
      ),
    },
  };
};

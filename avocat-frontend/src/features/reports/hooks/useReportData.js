import { useCallback, useEffect, useMemo, useState } from 'react';

const normalize = (value) => (value == null ? '' : String(value).toLowerCase().trim());

const toDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const withinDateRange = (value, startDate, endDate) => {
  if (!startDate && !endDate) return true;
  const itemDate = toDate(value);
  if (!itemDate) return false;

  if (startDate && itemDate < toDate(startDate)) return false;
  if (endDate && itemDate > toDate(endDate)) return false;
  return true;
};

export const useReportData = ({ fetcher, dateField, searchFields = [], selectFilterMap = {} }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    searchTerm: '',
    startDate: '',
    endDate: '',
    status: '',
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetcher();
      setRows(response?.data ?? []);
    } catch (err) {
      setError(err?.message || 'load_error');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateFilters = useCallback((nextFilters) => {
    setFilters((prev) => ({ ...prev, ...nextFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      startDate: '',
      endDate: '',
      status: '',
    });
  }, []);

  const filteredRows = useMemo(() => {
    const query = normalize(filters.searchTerm);

    return rows.filter((row) => {
      if (query) {
        const hasMatch = searchFields.some((field) => normalize(field(row)).includes(query));
        if (!hasMatch) return false;
      }

      if (filters.status) {
        const statusValue = normalize(row?.status);
        if (statusValue !== normalize(filters.status)) return false;
      }

      if (!withinDateRange(row?.[dateField], filters.startDate, filters.endDate)) {
        return false;
      }

      for (const [filterKey, accessor] of Object.entries(selectFilterMap)) {
        const selectedValue = filters?.[filterKey];
        if (!selectedValue) continue;
        if (normalize(accessor(row)) !== normalize(selectedValue)) return false;
      }

      return true;
    });
  }, [dateField, filters, rows, searchFields, selectFilterMap]);

  return {
    rows: filteredRows,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    reload: loadData,
  };
};

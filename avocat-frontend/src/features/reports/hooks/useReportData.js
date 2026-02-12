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

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.rows)) return payload.rows;
  if (Array.isArray(payload.items)) return payload.items;

  if (payload.data && typeof payload.data === 'object') {
    if (Array.isArray(payload.data.data)) return payload.data.data;
    if (Array.isArray(payload.data.rows)) return payload.data.rows;
    if (Array.isArray(payload.data.items)) return payload.data.items;
  }

  return [];
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
      setRows(extractRows(response));
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
    const safeRows = Array.isArray(rows) ? rows : [];
    const query = normalize(filters.searchTerm);

    return safeRows.filter((row) => {
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

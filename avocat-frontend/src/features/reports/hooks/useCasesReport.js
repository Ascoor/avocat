import { useCallback, useEffect, useMemo, useState } from 'react';
import { searchCases } from '@shared/services/api/legalCases';

const asArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const useCasesReport = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    searchTerm: '',
    startDate: '',
    endDate: '',
    status: '',
  });

  const loadData = useCallback(async (activeFilters = filters) => {
    setLoading(true);
    setError('');

    try {
      const response = await searchCases({
        q: activeFilters.searchTerm || undefined,
        from_date: activeFilters.startDate || undefined,
        to_date: activeFilters.endDate || undefined,
        status: activeFilters.status || undefined,
        paginate: false,
        include: 'clients,courts,caseType,caseSubType',
      });

      setRows(asArray(response?.data));
    } catch (err) {
      setError(err?.message || 'load_error');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadData(filters);
  }, []);

  const updateFilters = useCallback((nextFilters) => {
    const merged = { ...filters, ...nextFilters };
    setFilters(merged);
    loadData(merged);
  }, [filters, loadData]);

  const resetFilters = useCallback(() => {
    const clean = {
      searchTerm: '',
      startDate: '',
      endDate: '',
      status: '',
    };
    setFilters(clean);
    loadData(clean);
  }, [loadData]);

  const reload = useCallback(() => {
    loadData(filters);
  }, [filters, loadData]);

  const normalizedRows = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        case_number: row?.slug || row?.case_number || '-',
        client: row?.clients?.[0] || row?.client || null,
      })),
    [rows],
  );

  return {
    rows: normalizedRows,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    reload,
  };
};

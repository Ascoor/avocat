import { useCallback, useEffect, useMemo, useState } from 'react';
import { buildCasesTreeApi } from '../services/casesTreeApi.mock';

export const useCasesTreeState = ({ client, clientsPool = [], expansionMode = 'single' }) => {
  const [cases, setCases] = useState([]);
  const [isCasesLoading, setIsCasesLoading] = useState(false);
  const [casesError, setCasesError] = useState('');

  const [expandedCaseIds, setExpandedCaseIds] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [selectedChildItem, setSelectedChildItem] = useState(null);

  const [loadingByCaseId, setLoadingByCaseId] = useState({});
  const [errorByCaseId, setErrorByCaseId] = useState({});
  const [childrenCacheByCaseId, setChildrenCacheByCaseId] = useState({});

  const api = useMemo(
    () => buildCasesTreeApi({ clients: clientsPool.length ? clientsPool : [client].filter(Boolean) }),
    [client, clientsPool],
  );

  const loadCases = useCallback(async () => {
    if (!client?.id) return;

    setIsCasesLoading(true);
    setCasesError('');
    setExpandedCaseIds([]);
    setSelectedCaseId(null);
    setSelectedChildItem(null);

    try {
      const list = await api.getCasesByClient(client.id);
      setCases(list);
    } catch (error) {
      setCasesError(error.message || 'تعذر تحميل القضايا/الخدمات.');
      setCases([]);
    } finally {
      setIsCasesLoading(false);
    }
  }, [api, client?.id]);

  useEffect(() => {
    loadCases();
  }, [loadCases]);

  const loadCaseChildren = useCallback(
    async (caseItem) => {
      const caseId = typeof caseItem === 'object' ? caseItem?.id : caseItem;
      if (childrenCacheByCaseId[caseId] || loadingByCaseId[caseId]) return;

      setLoadingByCaseId((prev) => ({ ...prev, [caseId]: true }));
      setErrorByCaseId((prev) => ({ ...prev, [caseId]: '' }));

      try {
        const children = await api.getCaseChildren(caseItem);
        setChildrenCacheByCaseId((prev) => ({ ...prev, [caseId]: children }));
      } catch (error) {
        setErrorByCaseId((prev) => ({
          ...prev,
          [caseId]: error.message || 'حدث خطأ أثناء تحميل التفاصيل.',
        }));
      } finally {
        setLoadingByCaseId((prev) => ({ ...prev, [caseId]: false }));
      }
    },
    [api, childrenCacheByCaseId, loadingByCaseId],
  );

  const toggleCaseExpansion = useCallback(
    (caseId) => {
      const caseItem = cases.find((item) => item.id === caseId);
      setSelectedCaseId(caseId);
      setExpandedCaseIds((prev) => {
        const isExpanded = prev.includes(caseId);
        if (isExpanded) return prev.filter((id) => id !== caseId);

        if (expansionMode === 'single') {
          return [caseId];
        }

        return [...prev, caseId];
      });

      loadCaseChildren(caseItem || caseId);
    },
    [cases, expansionMode, loadCaseChildren],
  );

  return {
    cases,
    isCasesLoading,
    casesError,
    expandedCaseIds,
    selectedCaseId,
    selectedChildItem,
    loadingByCaseId,
    errorByCaseId,
    childrenCacheByCaseId,
    loadCases,
    toggleCaseExpansion,
    loadCaseChildren,
    setSelectedChildItem,
  };
};

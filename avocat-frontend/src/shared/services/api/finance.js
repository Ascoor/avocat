import api from './axiosConfig';

const resolvePayload = (response) => response?.data?.data ?? response?.data;

const withFallback = async (primary, fallback) => {
  try {
    return await primary();
  } catch (error) {
    if (error?.response?.status === 404 && fallback) {
      return fallback();
    }
    throw error;
  }
};

export const getLedgerTransactions = async (params = {}) => {
  const response = await withFallback(
    () => api.get('/finance/ledger', { params }),
    () => api.get('/expenses/search', { params }),
  );
  const payload = resolvePayload(response);
  return payload?.items ?? payload?.filtered_expenses ?? payload ?? [];
};

export const getCaseFinanceSummary = async (caseId) => {
  const response = await withFallback(
    () => api.get(`/finance/cases/${caseId}/summary`),
    () => api.get(`/legcases/${caseId}`),
  );
  return resolvePayload(response);
};

export const createFinanceTransaction = (payload) =>
  withFallback(
    () => api.post('/finance/transactions', payload),
    () => api.post('/expenses', payload),
  );

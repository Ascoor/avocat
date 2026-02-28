const envBaseUrl = import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? '';
const normalizedBaseUrl = String(envBaseUrl).trim().replace(/\/+$/, '');

const useDevProxy = import.meta.env.DEV;
const apiBaseURL = useDevProxy ? '/api/v1' : normalizedBaseUrl ? `${normalizedBaseUrl}/api/v1` : '/api/v1';

const API_CONFIG = {
  baseURL: normalizedBaseUrl,
  apiBaseURL,
  // baseURL: 'https://avocat.ask-ar.net/avocatapp',
};

export default API_CONFIG;

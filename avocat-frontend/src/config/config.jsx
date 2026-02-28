const envBaseUrl = import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? '';
const normalizedBaseUrl = String(envBaseUrl).trim().replace(/\/+$/, '');

const API_CONFIG = {
  baseURL: normalizedBaseUrl,
  apiBaseURL: normalizedBaseUrl ? `${normalizedBaseUrl}/api/v1` : '/api/v1',
  // baseURL: 'https://avocat.ask-ar.net/avocatapp',
};

export default API_CONFIG;

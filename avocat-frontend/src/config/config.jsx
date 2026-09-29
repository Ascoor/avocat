const normalizeBaseUrl = (value) => String(value || '').trim().replace(/\/+$/, '');

const API_CONFIG = {
  // Empty means same-origin. In production Nginx serves the SPA and proxies /api.
  baseURL: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL),
  searchApiURL: normalizeBaseUrl(import.meta.env.VITE_SEARCH_API_URL || '/search-api'),
};

export default API_CONFIG;

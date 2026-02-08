import axios from 'axios';
import API_CONFIG from '@config/config';
import { clearStoredAuth, getStoredToken } from '../auth/authStorage';

const api = axios.create({
  baseURL: `${API_CONFIG.baseURL}/api/v1`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add Interceptor to attach token to every request
api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 419) {
      clearStoredAuth();
      const currentPath = `${window.location.pathname}${window.location.search}`;
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign(`/login?next=${encodeURIComponent(currentPath)}`);
      }
    }
    return Promise.reject(error);
  },
);

export default api;

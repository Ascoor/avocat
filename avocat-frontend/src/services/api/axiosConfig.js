import axios from 'axios';
import API_CONFIG from '../../config/config';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add Interceptor to attach token to every request
api.interceptors.request.use((config) => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

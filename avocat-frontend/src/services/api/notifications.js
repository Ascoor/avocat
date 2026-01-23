// src/api/v1/notifications.js
import api from './axiosConfig';

export const getNotifications = (userId) =>
  api.get(`/api/v1/notifications/${userId}`);
export const markNotificationAsRead = (notificationId) =>
  api.post(`/api/v1/notifications/${notificationId}/read`);
export const createNotification = (data) => api.post('/api/v1/notification', data);

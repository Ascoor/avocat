// src/notifications.js
import api from './axiosConfig';

export const getNotifications = (userId) => api.get(`/notifications/${userId}`);
export const markNotificationAsRead = (notificationId) =>
  api.post(`/notifications/${notificationId}/read`);
export const createNotification = (data) => api.post('/notification', data);

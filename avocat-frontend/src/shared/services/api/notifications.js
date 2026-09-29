// src/notifications.js
import api from './axiosConfig';

export const getNotifications = () => api.get('/notifications');
export const markNotificationAsRead = (notificationId) =>
  api.post(`/notifications/${notificationId}/read`);

import api from './axiosConfig';
import type { AdminProfile } from '@shared/types/website';

export const getAdminProfile = async (): Promise<AdminProfile> => {
  const response = await api.get('/admin/profile');
  return response.data?.data ?? response.data;
};

export const updateAdminProfile = async (
  data: Partial<Pick<AdminProfile, 'name' | 'email'>>
): Promise<AdminProfile> => {
  const response = await api.put('/admin/profile', data);
  return response.data?.data ?? response.data;
};

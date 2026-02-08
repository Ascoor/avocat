import api from './axiosConfig';
import type { Client, ClientCreateDTO, ClientUpdateDTO } from '@shared/types/clients';

export const getClients = () => api.get<{ data: Client[] }>('/clients');

export const getUnClients = () => api.get<{ data: Client[] }>('/unclients');

export const getClientById = (id: string) => api.get<{ data: Client }>(`/clients/${id}`);

export const createClient = (data: ClientCreateDTO) => api.post<{ data: Client }>('/clients', data);

export const updateClient = (id: string, data: ClientUpdateDTO) => 
  api.put<{ data: Client }>(`/clients/${id}`, data);

export const deleteClient = (id: string) => api.delete(`/clients/${id}`);

export const updateClientStatus = (id: string, status: Client['status']) =>
  api.put<{ data: Client }>(`/clients/${id}`, { status });

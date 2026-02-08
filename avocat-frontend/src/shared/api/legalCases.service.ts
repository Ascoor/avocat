import api from './axiosConfig';
import type { LegalCase, LegalCaseCreateDTO, LegalCaseUpdateDTO } from '@shared/types/legalCase';

export const getLegCases = () => api.get<{ data: LegalCase[] }>('/leg-cases');

export const getLegCaseById = (id: string) => 
  api.get<{ data: { leg_case: LegalCase } }>(`/leg-cases/${id}`);

export const createLegCase = (data: LegalCaseCreateDTO) => 
  api.post<{ data: LegalCase }>('/leg-cases', data);

export const updateLegCase = (id: string, data: LegalCaseUpdateDTO) => 
  api.put<{ data: LegalCase }>(`/leg-cases/${id}`, data);

export const deleteLegCase = (id: string) => api.delete(`/leg-cases/${id}`);

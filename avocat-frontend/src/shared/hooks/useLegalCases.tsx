import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getLegCases,
  getLegCaseById,
  createLegCase,
  updateLegCase,
  deleteLegCase,
} from '@shared/api/legalCases.service';
import {
  LegalCase,
  LegalCaseCreateDTO,
  LegalCaseUpdateDTO,
} from '@shared/types/legalCase';

export const useLegalCases = () =>
  useQuery<LegalCase[], Error>({
    queryKey: ['legal-cases'],
    queryFn: async () => {
      const response = await getLegCases();
      return response.data?.data ?? response.data ?? [];
    },
  });

export const useLegalCase = (id?: string) =>
  useQuery<LegalCase, Error>({
    queryKey: ['legal-cases', id],
    queryFn: async () => {
      if (!id) throw new Error('Case ID is required');
      const response = await getLegCaseById(id);
      const payload: any = response.data?.data ?? response.data;
      return payload?.leg_case ?? payload;
    },
    enabled: !!id,
  });

export const useCreateLegalCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCase: LegalCaseCreateDTO) => createLegCase(newCase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legal-cases'] });
    },
  });
};

export const useUpdateLegalCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LegalCaseUpdateDTO }) =>
      updateLegCase(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['legal-cases'] });
      queryClient.invalidateQueries({ queryKey: ['legal-cases', variables.id] });
    },
  });
};

export const useDeleteLegalCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLegCase(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['legal-cases'] });
      queryClient.invalidateQueries({ queryKey: ['legal-cases', id] });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getLegCases,
  getLegCaseById,
  createLegCase,
  updateLegCase,
  deleteLegCase,
} from '@/api/legalCases.service';
import {
  LegalCase,
  LegalCaseCreateDTO,
  LegalCaseUpdateDTO,
} from '@/types/legalCase';

export const useLegalCases = () =>
  useQuery<LegalCase[], Error>({
    queryKey: ['legal-cases'],
    queryFn: async () => {
      const { data } = await getLegCases();
      return data;
    },
  });

export const useLegalCase = (id?: string) =>
  useQuery<LegalCase, Error>({
    queryKey: ['legal-cases', id],
    queryFn: async () => {
      if (!id) throw new Error('Case ID is required');
      const { data } = await getLegCaseById(id);
      return data.leg_case;
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

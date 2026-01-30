import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteClient, getClients } from '@/api/clients.service';
import type { Client } from '@/types/clients';

export const useClients = () => {
  const { data, isLoading, isError, error } = useQuery<Client[], Error>({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await getClients();
      return response.data ?? [];
    },
  });

  return {
    clients: data,
    isLoading,
    isError,
    error,
  };
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<void, Error, string>({
    mutationFn: async (clientId: string) => {
      await deleteClient(clientId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (deleteError) => {
      console.error('Delete error:', deleteError);
    },
  });

  return {
    deleteClient: mutate,
    isLoading: isPending,
    isError,
    error,
  };
};

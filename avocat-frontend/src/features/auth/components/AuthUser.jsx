import { useAuth as useAuthContext } from '@shared/contexts/AuthContext';

export default function useAuth() {
  return useAuthContext();
}

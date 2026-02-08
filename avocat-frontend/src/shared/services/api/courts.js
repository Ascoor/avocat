import useAuth from '@features/auth/components/AuthUser';

export const useCourtsApi = () => {
  const { http } = useAuth();

  const getCourts = () => http.get('/courts');
  const getCourtById = (id) => http.get(`/courts/${id}`);
  const createCourt = (data) => http.post('/courts', data);
  const updateCourt = (id, data) => http.put(`/courts/${id}`, data);
  const deleteCourt = (id) => http.delete(`/courts/${id}`);

  return {
    getCourts,
    getCourtById,
    createCourt,
    updateCourt,
    deleteCourt,
  };
};

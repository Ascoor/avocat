import { createSlice } from '@reduxjs/toolkit';
import { getClients, updateClientStatus } from '@shared/services/api/clients';
const initialState = {
  clients: [],
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateClientStatusInStore: (state, action) => {
      const { id, status } = action.payload;
      const client = state.clients.find((client) => client.id === id);
      if (client) {
        client.status = status;
      }
    },
  },
});

export const { setClients, setLoading, setError, updateClientStatusInStore } =
  clientsSlice.actions;

export const fetchClients = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await getClients();
    dispatch(setClients(response.data.clients));
  } catch (error) {
    dispatch(setError('Error fetching clients'));
  } finally {
    dispatch(setLoading(false));
  }
};
export const updateClientStatusAsync = (id, status) => async (dispatch) => {
  try {
    const response = await updateClientStatus(id, status);
    dispatch(updateClientStatusInStore({ id, status: response.data.status }));
  } catch (error) {
    console.error('Error updating client status:', error);
  }
};

export default clientsSlice.reducer;

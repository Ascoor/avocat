// 📁 src/store/clientsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getClients, updateClientStatus } from '@shared/services/api/clients'; // Importing the API method to fetch clients

// Initial state for clients
const initialState = {
  clients: [],
  loading: false,
  error: null,
};

// Create slice for clients management
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

// Selectors to retrieve state
export const selectClients = (state) => state.clients.clients;
export const selectLoading = (state) => state.clients.loading;
export const selectError = (state) => state.clients.error; // Add this selector

// Export actions
export const { setClients, setLoading, setError, updateClientStatusInStore } =
  clientsSlice.actions;

// Fetch clients from the API with async thunk
export const fetchClients = () => async (dispatch) => {
  dispatch(setLoading(true)); // Set loading state to true
  try {
    const response = await getClients(); // Call the API to get clients
    dispatch(setClients(response.data.clients)); // Dispatch clients to store
  } catch (error) {
    dispatch(setError('Error fetching clients')); // Handle any errors
  } finally {
    dispatch(setLoading(false)); // Set loading state to false after the API call
  }
};

// Update client status and update store
export const updateClientStatusAsync = (id, status) => async (dispatch) => {
  try {
    const response = await updateClientStatus(id, status); // Update client status via API
    dispatch(updateClientStatusInStore({ id, status: response.data.status })); // Update status in Redux store
  } catch (error) {
    console.error('Error updating client status:', error);
  }
};

export default clientsSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clientsSlice'; // Import the clients slice reducer

const store = configureStore({
  reducer: {
    clients: clientsReducer, // Register the clients reducer
  },
});

export default store;

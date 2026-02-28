import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clientsSlice'; // Import the clients slice reducer

const store = configureStore({
  reducer: {
    clients: clientsReducer, // Register the clients reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;

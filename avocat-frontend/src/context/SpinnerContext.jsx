import React, { createContext, useContext, useReducer } from 'react';
import GlobalSpinner from '../components/common/Spinners/GlobalSpinner';

const SpinnerContext = createContext();

const spinnerReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_SPINNER':
      return { loadingCount: state.loadingCount + 1 };
    case 'HIDE_SPINNER':
      return { loadingCount: Math.max(state.loadingCount - 1, 0) };
    default:
      return state;
  }
};

export const SpinnerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(spinnerReducer, { loadingCount: 0 });

  const showSpinner = () => dispatch({ type: 'SHOW_SPINNER' });
  const hideSpinner = () => dispatch({ type: 'HIDE_SPINNER' });

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      {state.loadingCount > 0 && <GlobalSpinner />}
      {children}
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error('useSpinner must be used within a SpinnerProvider');
  }
  return context;
};

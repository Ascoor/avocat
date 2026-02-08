import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import GlobalAlert from '@shared/components/common/GlobalAlert';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const timerRef = useRef(null);

  const triggerAlert = (type, message) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setAlert({ type, message });
    timerRef.current = setTimeout(() => setAlert(null), 5000);
  };

  const closeAlert = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setAlert(null);
  };

  useEffect(() => () => timerRef.current && clearTimeout(timerRef.current), []);

  return (
    <AlertContext.Provider value={{ alert, triggerAlert, closeAlert }}>
      {children}
      {alert && (
        <GlobalAlert
          type={alert.type}
          message={alert.message}
          onClose={closeAlert}
        />
      )}
    </AlertContext.Provider>
  );
};

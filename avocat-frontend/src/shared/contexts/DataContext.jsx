import React, { createContext, useState, useEffect } from 'react';
import {
  getLawyers,
  getLegCases,
  getProcedures,
  getSessions,
  getCourts,
  getServices,
} from '@shared/services/api/GeneralReqApi';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    lawyers: [],
    legCases: [],
    procedures: [],
    sessions: [],
    courts: [],
    services: [],
  });

  const fetchData = async (type, fetchFunction) => {
    try {
      const response = await fetchFunction();
      setData((prevData) => ({ ...prevData, [type]: response.data }));
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  };

  useEffect(() => {
    fetchData('lawyers', getLawyers);
    fetchData('legCases', getLegCases);
    fetchData('procedures', getProcedures);
    fetchData('sessions', getSessions);
    fetchData('courts', getCourts);
    fetchData('services', getServices);
  }, []);

  return (
    <DataContext.Provider
      value={{
        ...data,
        refetchLawyers: () => fetchData('lawyers', getLawyers),
        refetchLegCases: () => fetchData('legCases', getLegCases),
        refetchProcedures: () => fetchData('procedures', getProcedures),
        refetchSessions: () => fetchData('sessions', getSessions),
        refetchCourts: () => fetchData('courts', getCourts),
        refetchServices: () => fetchData('services', getServices),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

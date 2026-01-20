import React, { useEffect, useState } from 'react';
const GlobalSpinner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 mt-6 flex items-center justify-center z-50">
      {}
      <div className="absolute inset-0 backdrop-blur-xxl"></div>
      {}
      <div className="spinner-container flex flex-wrap gap-2 relative">
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-1 dark:bg-avocat-dark-dot-1"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-1  dark:bg-avocat-dark-dot-1"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-2  dark:bg-avocat-dark-dot-2"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-3  dark:bg-avocat-dark-dot-3"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-4  dark:bg-avocat-dark-dot-4"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-5  dark:bg-avocat-dark-dot-5"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-6  dark:bg-avocat-dark-dot-6"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-7  dark:bg-avocat-dark-dot-7"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-8  dark:bg-avocat-dark-dot-8"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-9  dark:bg-avocat-dark-dot-9"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-10  dark:bg-avocat-dark-dot-10"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-11  dark:bg-avocat-dark-dot-11"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-12  dark:bg-avocat-dark-dot-12"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-13  dark:bg-avocat-dark-dot-13"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-14  dark:bg-avocat-dark-dot-14"></div>
        <div className="dot w-4 h-4 rounded-full bg-avocat-dot-15  dark:bg-avocat-dark-dot-14"></div>
      </div>{' '}
    </div>
  );
};

export default GlobalSpinner;

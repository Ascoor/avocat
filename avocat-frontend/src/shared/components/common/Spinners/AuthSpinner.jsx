import React, { useEffect, useState } from 'react';
import { LogoText } from '@assets/images';

const AuthSpinner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-50">
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        {}
        <div className="w-28 h-28 border-8 border-gray-300 border-t-blue-200/60 rounded-full animate-spin relative flex items-center justify-center">
          {}
          <img
            src={LogoText}
            alt="Logo Animation"
            className={`absolute w-16 h-auto transition-opacity duration-1000 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'} animate-pulse`}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthSpinner;

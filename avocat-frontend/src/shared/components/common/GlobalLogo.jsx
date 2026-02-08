import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoBlue, LogoArt } from '@assets/images/index';

const GlobalLogo = ({ size = 'md', theme = 'auto' }) => {
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-28 h-12',
    lg: 'w-40 h-21',
  };

  const isLightMode = theme === 'light';
  const isDarkMode = theme === 'dark';
  const isAutoMode = theme === 'auto';

  return (
    <NavLink
      to="/"
      className="flex items-center justify-center h-16  dark:border-gray-700 group"
    >
      {}
      {(isLightMode || isAutoMode) && (
        <img
          src={LogoBlue}
          alt="Logo Blue"
          className={`${sizeClasses[size]} ${
            isDarkMode ? 'hidden' : 'block dark:hidden'
          }  `}
        />
      )}

      {}
      {(isDarkMode || isAutoMode) && (
        <img
          src={LogoArt}
          alt="Logo Art"
          className={`${sizeClasses[size]} ${
            isLightMode ? 'hidden' : 'hidden dark:block'
          }  `}
        />
      )}
    </NavLink>
  );
};

export default GlobalLogo;

import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 640 && window.innerWidth <= 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(false); // أغلق القائمة عند التبديل إلى سطح المكتب
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile || isTablet) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile, isTablet]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebarElement = document.querySelector('.sidebar');
      if (sidebarElement && !sidebarElement.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };

    if ((isMobile || isTablet) && isSidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, isTablet, isSidebarOpen]);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isMobile,
        isTablet,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

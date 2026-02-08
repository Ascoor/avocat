export const getSidebarClasses = (isSidebarOpen, isMobile) => {
  if (isSidebarOpen) {
    return isMobile ? 'translate-x-0 w-full' : 'translate-x-0 w-64';
  } else {
    return isMobile ? 'translate-x-full w-full' : 'translate-x-0 w-20';
  }
};

export const getHeaderClasses = (isSidebarOpen, isMobile) => {
  return isSidebarOpen && !isMobile ? 'md:mr-64' : 'mr-0';
};

export const toggleSidebar = (isSidebarOpen, setIsSidebarOpen) => {
  setIsSidebarOpen(!isSidebarOpen);
};

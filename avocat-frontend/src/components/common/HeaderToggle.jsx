import React from 'react';
import { useSidebar } from '../../utils/SidebarContext';

function HeaderToggle() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  return (
    <button
      className="text-white mr-2 hover:text-green-400 dark:text-cyan-200 dark:hover:text-orange-400 transition-colors duration-300 ease-in-out"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      aria-controls="sidebar"
      aria-expanded={isSidebarOpen}
    >
      <span className="sr-only">
        {isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      </span>
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isSidebarOpen ? (
          <path d="M13.3 5.3l-1.4 1.4L16.2 11H4v2h12.2l-4.3 4.3 1.4 1.4L20 12z" />
        ) : (
          <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
        )}
      </svg>
    </button>
  );
}

export default HeaderToggle;

import React from 'react';
import Notifications from '../common/DropdownNotifications';
import UserMenu from '../common/DropdownProfile';
import ThemeToggle from '../common/ThemeToggle';
import HeaderToggle from '../common/HeaderToggle';
import { useSidebar } from '../../utils/SidebarContext';
import { motion } from 'framer-motion';
const Header = () => {
  const { isSidebarOpen, isMobile } = useSidebar();
  const headerVariants = {
    hidden: { y: '-100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`bg-gradient-to-l from-avocat-indigo via-avocat-indigo to-avocat-blue-light dark:bg-gradient-to-r dark:from-avocat-blue-dark dark:via-avocat-indigo-darker dark:to-avocat-blue-darker fixed top-0 right-0 left-0 z-20 shadow-lg transition-all duration-300 ${
       isSidebarOpen   ? 'md:mr-64' : 'md:mr-16'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <HeaderToggle />

        {}
        <div className="flex items-center space-x-6 space-x-reverse">
          <Notifications align="right" />
          <ThemeToggle />
          <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
          <UserMenu align="left" />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

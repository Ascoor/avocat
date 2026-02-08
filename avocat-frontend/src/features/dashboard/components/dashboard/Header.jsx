import React from 'react';
import Notifications from '@shared/components/common/DropdownNotifications';
import UserMenu from '@shared/components/common/DropdownProfile';
import ThemeToggle from '@shared/components/common/ThemeToggle';
import HeaderToggle from '@shared/components/common/HeaderToggle';
import { useSidebar } from '@shared/contexts/SidebarContext';
import { motion } from 'framer-motion';
const Header = ({ sidebarOffset }) => {
  const { isMobile } = useSidebar();
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
      style={{ marginRight: isMobile ? '0' : sidebarOffset }}
      className="app-header fixed top-0 right-0 left-0 z-20 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14 sm:h-16">
        <div className="flex items-center gap-3">
          <HeaderToggle />
          <div className="hidden sm:flex flex-col text-white">
            <span className="text-xs uppercase tracking-[0.2em] text-white/70">
              مرحباً بعودتك
            </span>
            <span className="text-base font-semibold">لوحة التحكم الذكية</span>
          </div>
        </div>

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

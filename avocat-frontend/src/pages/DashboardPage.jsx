import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { useSidebar } from '../utils/SidebarContext';
import AuthRoutes from '../components/layout/AuthRoutes';
import { motion } from 'framer-motion';

const AuthWrapper = () => {
  const { isSidebarOpen, isMobile, isTablet } = useSidebar();

  const sidebarWidth = isMobile
    ? isSidebarOpen
      ? '100%'  // الموبايل: افتح على كامل الشاشة
      : '0'
    : isTablet
      ? isSidebarOpen
        ? '14rem' // التابلت: افتح إلى حجم متوسط
        : '5rem'
      : isSidebarOpen
        ? '18rem' // سطح المكتب: الحجم الكامل
        : '5rem';

  return (
    <motion.div
      className="flex flex-col md:flex-row h-screen font-['cairo'] transition-all duration-500 ease-in-out bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black dark:bg-opacity-90 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sidebar */}
      <motion.div
        style={{ width: sidebarWidth }}
        className="transition-all duration-500 ease-in-out shadow-lg dark:shadow-neon"
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Sidebar />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-500 ease-in-out">
        {/* Header */}
        <motion.div
          className="shadow-md dark:shadow-neon border-b border-gray-200 dark:border-gray-800"
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <Header />
        </motion.div>

        {/* AuthRoutes Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-200 dark:bg-gray-700/50">
          <div className="w-full flex justify-center">
            <main className="w-full max-w-screen-xl p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <AuthRoutes />
            </main>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthWrapper;

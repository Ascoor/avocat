import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { useSidebar } from '../utils/SidebarContext';
import AuthRoutes from '../components/layout/AuthRoutes';
import { motion } from 'framer-motion';

const AuthWrapper = () => {
  const { isSidebarOpen, isMobile, isTablet } = useSidebar();

  // تحديد عرض الشريط الجانبي بناءً على حجم الجهاز
  const sidebarWidth = isMobile
    ? isSidebarOpen
      ? '100%'  // الموبايل: الشريط الجانبي يعرض كامل الشاشة
      : '0'      // الموبايل: الشريط الجانبي مخفي
    : isTablet
      ? isSidebarOpen
        ? '14rem'  // التابلت: عرض متوسط للشريط الجانبي
        : '5rem'   // التابلت: شريط جانبي صغير عند الإخفاء
      : isSidebarOpen
        ? '16rem'   // سطح المكتب: الشريط الجانبي كامل
        : '5rem';   // سطح المكتب: الشريط الجانبي صغير عند الإخفاء

  return (
    <motion.div
      className="app-shell flex flex-col md:flex-row h-screen font-['cairo'] transition-all duration-500 ease-in-out relative"
      style={{ perspective: '1200px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sidebar */}
      <motion.div
        style={{ width: sidebarWidth }}
        className="transition-all duration-500 ease-in-out"
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 60 }}
      >
        <Sidebar />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 flex flex-col transition-all duration-500 ease-in-out"
        animate={{
          scale: isSidebarOpen && !isMobile ? 0.985 : 1,
          filter: isSidebarOpen && !isMobile ? 'brightness(0.98)' : 'brightness(1)',
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        {/* Header */}
        <motion.div
          className="border-b border-[color:var(--app-border)]"
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <Header />
        </motion.div>

        {/* AuthRoutes Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[var(--app-bg-secondary)]">
          <div className="w-full flex justify-center">
            <main className="w-full max-w-screen-xl p-4 md:p-6 lg:p-8 app-panel">
              <AuthRoutes />
            </main>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthWrapper;
  
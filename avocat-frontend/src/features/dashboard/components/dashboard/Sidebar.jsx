import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSidebar } from '@shared/contexts/SidebarContext';
import { motion } from 'framer-motion';
import { LogoArt, LogoSuit } from '@assets/images/index';
import {
  FaHome,
  FaBars,
  FaFolder,
  FaUsers,
  FaCogs,
  FaFileInvoice,
  FaBriefcase,
  FaBalanceScale,
  FaMoneyBillWave,
  FaSearch,
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, isMobile, isTablet } = useSidebar();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarVariants = {
    open: {
      width: isMobile ? '100%' : isTablet ? '14rem' : '18rem',
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      width: isMobile ? '0' : '4rem',
      opacity: 0.9,
      y: '0%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuSections = [
    {
      title: 'الرئيسية',
      items: [{ to: '/', icon: <FaHome />, label: 'لوحة المتابعة' }],
    },
    {
      title: 'إدارة القضايا',
      items: [
        { to: '/legcases', icon: <FaFolder />, label: 'القضايا' },
        { to: '/legcase-services', icon: <FaCogs />, label: 'الخدمات' },
        { to: '/consultations', icon: <FaBalanceScale />, label: 'الاستشارات' },
        { to: '/contracts', icon: <FaBriefcase />, label: 'العقود' },
      ],
    },
    {
      title: 'العملاء والمالية',
      items: [
        { to: '/clients', icon: <FaUsers />, label: 'العملاء' },
        { to: '/invoices', icon: <FaFileInvoice />, label: 'الفواتير' },
        { to: '/expenses', icon: <FaMoneyBillWave />, label: 'المصروفات' },
      ],
    },
    {
      title: 'الأدوات',
      items: [{ to: '/search-courts-api', icon: <FaSearch />, label: 'بحث محاكم' }],
    },
  ];

  const handleNavClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {isMobile && isSidebarOpen ? (
        <button
          type="button"
          aria-label="إغلاق القائمة الجانبية"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      ) : null}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? 'open' : 'closed'}
        className="sidebar app-sidebar fixed top-0 right-0 h-full z-30 flex flex-col transition-all ease-in-out text-white/90 backdrop-blur-xl"
        id="sidebar"
      >
      {}
      <div
        className={` flex items-center justify-center h-16 ${isMobile ? 'mt-6' : 'mt-0'}`}
      >
        <img
          src={isSidebarOpen ? LogoArt : LogoSuit}
          alt="Logo"
          className={isSidebarOpen ? 'w-28 h-16 mt-16' : 'w-12 h-12 mt-2'}
        />
      </div>

      {}
      <div
        className={`mt-4 flex-1 overflow-y-auto px-3 transition-opacity ${isSidebarOpen ? 'opacity-100 mt-10' : 'opacity-0 md:opacity-100'}`}
      >
        {menuSections.map((section) => (
          <div key={section.title} className="mb-6">
            {isSidebarOpen && (
              <p className="px-3 text-xs uppercase tracking-[0.25em] text-white/60 mb-3">
                {section.title}
              </p>
            )}
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.to} className="group relative">
                  <NavLink
                    to={item.to}
                    onClick={handleNavClick}
                    title={!isSidebarOpen ? item.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 ease-in-out ${
                        isSidebarOpen ? 'justify-start' : 'justify-center'
                      } ${
                        isActive
                          ? 'bg-white/20 text-white shadow-lg'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      } group-hover:translate-x-1`
                    }
                  >
                    <span className="text-xl opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.icon}
                    </span>
                    {isSidebarOpen && (
                      <span className="flex-1 text-sm font-semibold tracking-wide">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {}
      <button
        onClick={toggleSidebar}
        className="absolute bottom-6 right-4 p-2 bg-white/15 text-white rounded-full hover:bg-white/30 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
      >
        {isSidebarOpen ? (
          <IoMdClose className="text-2xl" />
        ) : (
          <FaBars className="text-2xl" />
        )}
      </button>
      </motion.div>
    </>
  );
};

export default Sidebar;

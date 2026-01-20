import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSidebar } from '../../utils/SidebarContext';
import { motion } from 'framer-motion';
import { LogoArt, LogoSuit } from '../../assets/images/index';
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
  const { isSidebarOpen, setIsSidebarOpen, isMobile } = useSidebar();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarVariants = {
    open: {
      width: isMobile ? '100%' : '18rem',
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

  const menuItems = [
    { to: '/', icon: <FaHome />, label: 'الرئيسية' },
    { to: '/legcases', icon: <FaFolder />, label: 'القضايا' },
    { to: '/clients', icon: <FaUsers />, label: 'العملاء' },
    { to: '/legcase-services', icon: <FaCogs />, label: 'الخدمات' },
    { to: '/invoices', icon: <FaFileInvoice />, label: 'الفواتير' },
    { to: '/consultations', icon: <FaBalanceScale />, label: 'الاستشارات' },
    { to: '/expenses', icon: <FaMoneyBillWave />, label: 'المصروفات' },
    { to: '/contracts', icon: <FaBriefcase />, label: 'العقود' },
    { to: '/search-courts-api', icon: <FaSearch />, label: 'بحث محاكم' },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      initial="closed"
      animate={isSidebarOpen ? 'open' : 'closed'}
      className="fixed top-0 right-0 h-full bg-gradient-to-b from-avocat-indigo-dark via-avocat-indigo to-avocat-blue-light dark:bg-gradient-to-b dark:from-avocat-blue-darker dark:via-gradient-night dark:to-avocat-blue shadow-lg z-30 flex flex-col transition-all ease-in-out"
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
      <ul
        className={`mt-4 flex-1 transition-opacity ${isSidebarOpen ? 'opacity-100 mt-14' : 'opacity-0 md:opacity-100'}`}
      >
        {menuItems.map((item, index) => (
          <li key={index} className="group relative">
            <NavLink
              to={item.to}
              className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'space-x-4 text-gray-100 hover:bg-avocat-blue-light hover:text-avocat-orange dark:hover:bg-avocat-yellow-light dark:hover:text-yellow-400' : 'justify-center'}
                group-hover:scale-105`}
            >
              <span className="text-xl text-gray-300 group-hover:text-avocat-yellow dark:group-hover:text-avocat-orange-light transition-colors">
                {item.icon}
              </span>
              {isSidebarOpen && (
                <span className="flex-1 text-gray-100 text-center font-bold group-hover:text-avocat-yellow dark:group-hover:text-avocat-blue-dark tracking-wide">
                  {item.label}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {}
      <button
        onClick={toggleSidebar}
        className="absolute bottom-6 right-4 p-2 bg-indigo-700 dark:bg-purple-500/50 text-white rounded-full hover:bg-indigo-500 dark:hover:bg-yellow-500 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
      >
        {isSidebarOpen ? (
          <IoMdClose className="text-2xl" />
        ) : (
          <FaBars className="text-2xl" />
        )}
      </button>
    </motion.div>
  );
};

export default Sidebar;

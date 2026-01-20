import React from 'react';
import BarChart from '../charts/BarChart03';
import {
  FaBalanceScale,
  FaGavel,
  FaExclamationTriangle,
  FaRegSadCry,
  FaClipboardCheck,
} from 'react-icons/fa';

import { tailwindConfig } from '../../../utils/Utils';

function DashboardCard11({ isDarkMode }) {
  const chartData = {
    labels: ['الأسباب'],
    datasets: [
      {
        label: '⚖️ وجود صعوبات في استخدام المنتج',
        data: [131],
        backgroundColor: isDarkMode ? '#7B61FF' : '#4F46E5',
        hoverBackgroundColor: isDarkMode ? '#5A48D6' : '#4338CA',
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: '📜 نقص في الميزات المطلوبة',
        data: [100],
        backgroundColor: isDarkMode ? '#9B67FF' : '#7C3AED',
        hoverBackgroundColor: isDarkMode ? '#754BC6' : '#6D28D9',
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: '❗ عدم الرضا عن جودة المنتج',
        data: [81],
        backgroundColor: isDarkMode ? '#FF6347' : '#DC2626',
        hoverBackgroundColor: isDarkMode ? '#CC5040' : '#B91C1C',
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: '📜 المنتج لا يتطابق مع ما تم الإعلان عنه',
        data: [65],
        backgroundColor: isDarkMode ? '#32CD32' : '#16A34A',
        hoverBackgroundColor: isDarkMode ? '#28A428' : '#15803D',
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: '❔ أخرى',
        data: [72],
        backgroundColor: isDarkMode ? '#A0AEC0' : '#6B7280',
        hoverBackgroundColor: isDarkMode ? '#718096' : '#4B5563',
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl">
      <header className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 flex items-center">
          ⚖️ أسباب طلبات الاسترداد
        </h2>
      </header>

      {}
      <div className="px-5 py-3">
        <div className="flex items-center space-x-2">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            449
          </div>
          <div className="text-sm font-medium text-red-700 px-2 bg-red-500/20 rounded-full">
            -22%
          </div>
        </div>
      </div>

      {}
      <div className="flex justify-around text-gray-700 dark:text-gray-300 text-lg my-2">
        <span className="flex items-center space-x-1">
          <FaBalanceScale /> <span>صعوبات الاستخدام</span>
        </span>
        <span className="flex items-center space-x-1">
          <FaClipboardCheck /> <span>نقص الميزات</span>
        </span>
        <span className="flex items-center space-x-1">
          <FaRegSadCry /> <span>جودة المنتج</span>
        </span>
        <span className="flex items-center space-x-1">
          <FaExclamationTriangle /> <span>عدم التطابق</span>
        </span>
      </div>

      {}
      <div className="grow">
        <BarChart data={chartData} width={595} height={48} />
      </div>
    </div>
  );
}

export default DashboardCard11;

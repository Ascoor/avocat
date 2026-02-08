import React, { useMemo } from 'react';
import BarChart from '../charts/BarChart03';
import {
  FaBalanceScale,
  FaGavel,
  FaExclamationTriangle,
  FaRegSadCry,
  FaClipboardCheck,
} from 'react-icons/fa';

import { getChartPalette } from '@shared/utils/themeColors';

function DashboardCard11({ isDarkMode }) {
  const chartPalette = useMemo(
    () =>
      getChartPalette([
        '#4F46E5',
        '#7C3AED',
        '#DC2626',
        '#16A34A',
        '#6B7280',
      ]),
    [isDarkMode],
  );

  const chartData = {
    labels: ['الأسباب'],
    datasets: [
      {
        label: '⚖️ وجود صعوبات في استخدام المنتج',
        data: [131],
        backgroundColor: chartPalette[0],
        hoverBackgroundColor: chartPalette[1],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: '📜 نقص في الميزات المطلوبة',
        data: [100],
        backgroundColor: chartPalette[1],
        hoverBackgroundColor: chartPalette[2],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: '❗ عدم الرضا عن جودة المنتج',
        data: [81],
        backgroundColor: chartPalette[2],
        hoverBackgroundColor: chartPalette[3],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: '📜 المنتج لا يتطابق مع ما تم الإعلان عنه',
        data: [65],
        backgroundColor: chartPalette[3],
        hoverBackgroundColor: chartPalette[4],
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: '❔ أخرى',
        data: [72],
        backgroundColor: chartPalette[4],
        hoverBackgroundColor: chartPalette[0],
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 card-legal">
      <header className="px-5 py-4 border-b border-border flex items-center">
        <h2 className="font-semibold text-lg text-foreground flex items-center">
          ⚖️ أسباب طلبات الاسترداد
        </h2>
      </header>

      {}
      <div className="px-5 py-3">
        <div className="flex items-center space-x-2">
          <div className="text-3xl font-bold text-foreground">
            449
          </div>
          <div className="text-sm font-medium text-[var(--app-danger)] px-2 bg-[var(--app-info-soft)] rounded-full">
            -22%
          </div>
        </div>
      </div>

      {}
      <div className="flex justify-around text-muted-foreground text-lg my-2">
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

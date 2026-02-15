import React, { useState, useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { getChartPalette, getChartTextColor } from '@shared/utils/themeColors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
);

function DashboardCard06({ isDarkMode }) {
  const [revenueData, setRevenueData] = useState({
    labels: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    expectedRevenue: [
      20000, 25000, 22000, 27000, 30000, 31000, 33000, 35000, 34000, 38000,
      39000, 41000,
    ],
    actualRevenue: [
      18000, 23000, 21000, 26000, 28000, 29000, 32000, 34000, 33000, 37000,
      38000, 40000,
    ],
  });

  const chartPalette = useMemo(
    () =>
      getChartPalette([
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#8B5CF6',
        '#EF4444',
      ]),
    [isDarkMode],
  );

  const chartData = {
    labels: revenueData.labels,
    datasets: [
      {
        type: 'bar',
        label: 'الإيرادات المتوقعة',
        data: revenueData.expectedRevenue,
        backgroundColor: chartPalette[0],
        borderColor: chartPalette[3],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 40,
      },
      {
        type: 'line',
        label: 'الإيرادات المحققة',
        data: revenueData.actualRevenue,
        borderColor: chartPalette[1],
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: chartPalette[1],
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: getChartTextColor(isDarkMode ? '#DDD' : '#333'),
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: getChartTextColor(isDarkMode ? '#DDD' : '#333') },
      },
      y: {
        ticks: {
          color: getChartTextColor(isDarkMode ? '#DDD' : '#333'),
          stepSize: 5000,
        },
      },
    },
  };

  return (
    <div className="dashboard-card p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="dashboard-card-header px-5 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-md">💰 الدخل المتوقع من القضايا</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--app-success-soft)] text-[var(--app-success)]">
          مالي
        </span>
      </header>

      {}
      <div className="mt-4">
        <p className="text-sm text-[var(--app-muted)]">
          يعرض هذا المخطط مقارنة بين الإيرادات المتوقعة والمحققة من القضايا، مما
          يساعد في التنبؤ المالي وتحقيق الأهداف المالية.
        </p>
      </div>

      {}
      <div className="w-full h-64 sm:h-80 md:h-96 mt-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default DashboardCard06;

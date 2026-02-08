import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getChartPalette, getChartTextColor } from '@shared/utils/themeColors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function DashboardCard03({ isDarkMode }) {
  const [caseDurationData, setCaseDurationData] = useState({
    labels: ['جنائي', 'مدني', 'تجاري', 'عمالي', 'إداري'],
    durations: [180, 120, 90, 60, 45],
  });

  const chartPalette = useMemo(
    () =>
      getChartPalette([
        '#EF4444',
        '#3B82F6',
        '#F59E0B',
        '#10B981',
        '#8B5CF6',
      ]),
    [isDarkMode],
  );

  const chartData = {
    labels: caseDurationData.labels,
    datasets: [
      {
        label: 'متوسط المدة (بالأيام)',
        data: caseDurationData.durations,
        backgroundColor: chartPalette,
        borderColor: getChartTextColor(isDarkMode ? '#FFF' : '#333'),
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 50,
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
          stepSize: 30,
        },
      },
    },
  };

  return (
    <div className="dashboard-card p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="dashboard-card-header px-5 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-md">⏳ متوسط مدة إنهاء القضايا</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--app-success-soft)] text-[var(--app-success)]">
          أداء
        </span>
      </header>

      {}
      <div className="mt-4">
        <p className="text-sm text-[var(--app-muted)]">
          يعرض هذا المخطط متوسط المدة التي تستغرقها القضايا قبل الإغلاق، مما
          يساعد في تقييم أداء المكتب وتحسين العمليات.
        </p>
      </div>

      {}
      <div className="w-full h-64 sm:h-80 md:h-96 mt-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default DashboardCard03;

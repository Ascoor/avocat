import React, { useState, useEffect } from 'react';
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

  const chartData = {
    labels: caseDurationData.labels,
    datasets: [
      {
        label: 'متوسط المدة (بالأيام)',
        data: caseDurationData.durations,
        backgroundColor: isDarkMode
          ? ['#ffbb34', '#60A5FA', '#FBBF24', '#f2a33b', '#A78BFA']
          : ['#EF4444', '#3B82F6', '#F59E0B', '#f2a33b', '#8B5CF6'],
        borderColor: isDarkMode ? '#FFF' : '#333',
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
          color: isDarkMode ? '#DDD' : '#333',
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDarkMode ? '#DDD' : '#333' },
      },
      y: {
        ticks: { color: isDarkMode ? '#DDD' : '#333', stepSize: 30 },
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gradient-night dark:text-white text-gray-800 shadow rounded-lg p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="px-5 py-4 border-b border-gray-300 dark:border-gray-700 flex items-center">
        <h2 className="font-semibold text-md">⏳ متوسط مدة إنهاء القضايا</h2>
      </header>

      {}
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-300">
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

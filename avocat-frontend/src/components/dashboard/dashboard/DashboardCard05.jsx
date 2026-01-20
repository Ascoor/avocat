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

function DashboardCard05({ isDarkMode }) {
  const [sessionData, setSessionData] = useState({
    labels: [
      'الإثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
      'الأحد',
    ],
    sessionCounts: [3, 5, 2, 8, 6, 4, 7],
  });

  const chartData = {
    labels: sessionData.labels,
    datasets: [
      {
        label: 'عدد الجلسات',
        data: sessionData.sessionCounts,
        backgroundColor: isDarkMode
          ? [
              '#F87171',
              '#60A5FA',
              '#FBBF24',
              '#34D399',
              '#A78BFA',
              '#EAB308',
              '#4ADE80',
            ]
          : [
              '#EF4444',
              '#3B82F6',
              '#F59E0B',
              '#10B981',
              '#8B5CF6',
              '#EAB308',
              '#22C55E',
            ],
        borderColor: isDarkMode ? '#FFF' : '#333',
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 40,
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
        ticks: { color: isDarkMode ? '#DDD' : '#333', stepSize: 2 },
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gradient-night dark:text-white text-gray-800 shadow rounded-lg p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="px-5 py-4 border-b border-gray-300 dark:border-gray-700 flex items-center">
        <h2 className="font-semibold text-md">📅 عدد الجلسات القادمة</h2>
      </header>

      {}
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          يعرض هذا المخطط عدد الجلسات القانونية القادمة خلال الأسبوع، مما يساعد
          في جدولة الجلسات بكفاءة.
        </p>
      </div>

      {}
      <div className="w-full h-64 sm:h-80 md:h-96 mt-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default DashboardCard05;

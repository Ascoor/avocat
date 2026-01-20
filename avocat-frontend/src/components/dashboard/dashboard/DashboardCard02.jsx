import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardCard02({ isDarkMode }) {
  const [caseData, setCaseData] = useState({
    labels: ['جنائي', 'مدني', 'تجاري', 'عمالي', 'إداري'],
    counts: [45, 30, 15, 10, 25],
  });

  const chartData = {
    labels: caseData.labels,
    datasets: [
      {
        label: 'نسبة توزيع القضايا',
        data: caseData.counts,
        backgroundColor: isDarkMode
          ? ['#F87171', '#60A5FA', '#FBBF24', '#34D399', '#A78BFA']
          : ['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDarkMode ? '#DDD' : '#333',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gradient-night dark:text-white text-gray-800 shadow rounded-lg p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="px-5 py-4 border-b border-gray-300 dark:border-gray-700 flex items-center">
        <h2 className="font-semibold text-md">⚖️ توزيع القضايا حسب النوع</h2>
      </header>

      {}
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          يوضح هذا المخطط نسبة توزيع القضايا حسب التخصصات القانونية، مما يساعد
          في اتخاذ قرارات متعلقة بالتوظيف واستراتيجيات التسويق.
        </p>
      </div>

      {}
      <div className="w-full h-64 sm:h-80 md:h-96 mt-4">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default DashboardCard02;

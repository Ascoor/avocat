import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function DashboardCard01({ isDarkMode }) {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);

      if (isDarkMode) {
        gradientFill.addColorStop(0, '#ad90f5');
        gradientFill.addColorStop(0.5, '#9d78fc');
        gradientFill.addColorStop(1, '#ffbb34');
      } else {
        gradientFill.addColorStop(0, '#f2a33b');
        gradientFill.addColorStop(0.5, '#4682B4');
        gradientFill.addColorStop(1, '#87CEFA');
      }

      setGradient(gradientFill);
    }
  }, [isDarkMode]);

  const caseData = {
    months: [
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
    cases: [20, 25, 22, 30, 45, 50, 48, 60, 55, 70, 65, 80],
  };

  const textColor = isDarkMode ? '#DDD' : '#333';

  const chartData = {
    labels: caseData.months,
    datasets: [
      {
        label: 'عدد القضايا المفتوحة',
        data: caseData.cases,
        borderColor: gradient || (isDarkMode ? '#ffbb34' : '#f2a33b'),
        backgroundColor: gradient ? gradient : 'rgba(0,0,0,0.1)',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: isDarkMode ? '#9d78fc' : '#f2a33b',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor },
      },
      y: {
        ticks: { color: textColor, stepSize: 10 },
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gradient-night dark:text-white text-gray-800 shadow rounded-lg p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="px-5 py-4 border-b border-gray-300 dark:border-gray-700 flex items-center">
        <h2 className="font-semibold text-md">📊 تطور عدد القضايا الشهرية</h2>
      </header>

      {}
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          يعرض هذا المخطط عدد القضايا المفتوحة في كل شهر لمتابعة تطور الأعمال
          القانونية.
        </p>
      </div>

      {}
      <div className="w-full h-64 sm:h-80 md:h-96 mt-4">
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default DashboardCard01;

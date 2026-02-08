import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { getChartPalette, getChartTextColor } from '@shared/utils/themeColors';

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

  const chartPalette = useMemo(
    () =>
      getChartPalette([
        '#4F46E5',
        '#F97316',
        '#A855F7',
        '#22C55E',
        '#EAB308',
        '#60A5FA',
      ]),
    [isDarkMode],
  );

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);

      gradientFill.addColorStop(0, chartPalette[0]);
      gradientFill.addColorStop(0.5, chartPalette[2]);
      gradientFill.addColorStop(1, chartPalette[4]);

      setGradient(gradientFill);
    }
  }, [chartPalette]);

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

  const textColor = getChartTextColor(isDarkMode ? '#DDD' : '#333');

  const chartData = {
    labels: caseData.months,
    datasets: [
      {
        label: 'عدد القضايا المفتوحة',
        data: caseData.cases,
        borderColor: gradient || chartPalette[4],
        backgroundColor: gradient ? gradient : 'rgba(0,0,0,0.1)',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: chartPalette[2],
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
    <div className="dashboard-card p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="dashboard-card-header px-5 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-md">📊 تطور عدد القضايا الشهرية</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--app-info-soft)] text-[var(--app-accent)]">
          تحليلي
        </span>
      </header>

      {}
      <div className="mt-4">
        <p className="text-sm text-[var(--app-muted)]">
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

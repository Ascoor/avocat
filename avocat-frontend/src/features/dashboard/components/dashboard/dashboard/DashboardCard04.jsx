import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import {
  getChartPalette,
  getChartTextColor,
  getChartTooltipColors,
} from '@shared/utils/themeColors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function DashboardCard04({ isDarkMode }) {
  const chartRef = useRef(null);
  const [gradientColors, setGradientColors] = useState([]);

  const chartPalette = useMemo(
    () =>
      getChartPalette([
        '#F97316',
        '#10B981',
        '#F43F5E',
        '#3B82F6',
        '#EAB308',
      ]),
    [isDarkMode],
  );

  const tooltipColors = useMemo(
    () =>
      getChartTooltipColors({
        body: isDarkMode ? '#CCC' : '#444',
        background: isDarkMode ? '#2B1B50' : '#FFF',
        border: isDarkMode ? '#3F2A6B' : '#E5E7EB',
        title: isDarkMode ? '#FFF' : '#000',
      }),
    [isDarkMode],
  );

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const colors = lawyerPerformance.casesHandled.map((_, index) => {
        const gradient = ctx.createLinearGradient(0, 0, 400, 0);

        gradient.addColorStop(0, chartPalette[index % chartPalette.length]);
        gradient.addColorStop(
          1,
          isDarkMode ? 'hsl(252 35% 18%)' : 'hsl(45 85% 92%)',
        );

        return gradient;
      });
      setGradientColors(colors);
    }
  }, [chartPalette, isDarkMode]);

  const lawyerPerformance = {
    labels: [
      'أحمد العتيبي',
      'محمد القحطاني',
      'سارة الأنصاري',
      'نورة السبيعي',
      'عبدالله الدوسري',
    ],
    casesHandled: [50, 75, 40, 65, 55],
    successRate: [85, 90, 75, 80, 70],
  };

  const backgroundColors = gradientColors.length
    ? gradientColors
    : chartPalette;
  const chartData = {
    labels: lawyerPerformance.labels,
    datasets: [
      {
        label: 'عدد القضايا',
        data: lawyerPerformance.casesHandled,
        backgroundColor: backgroundColors,
        borderColor: getChartTextColor(isDarkMode ? '#FFF' : '#333'),
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 20,
        hoverBackgroundColor: chartPalette[4],
      },
      {
        label: 'نسبة النجاح (%)',
        data: lawyerPerformance.successRate,
        backgroundColor: chartPalette[1],
        borderColor: chartPalette[3],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
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
      tooltip: {
        backgroundColor: tooltipColors.background,
        titleColor: tooltipColors.title,
        bodyColor: tooltipColors.body,
      },
    },
    scales: {
      x: {
        ticks: {
          color: getChartTextColor(isDarkMode ? '#DDD' : '#333'),
          stepSize: 10,
        },
      },
      y: {
        grid: { display: false },
        ticks: { color: getChartTextColor(isDarkMode ? '#DDD' : '#333') },
      },
    },
  };

  return (
    <div className="dashboard-card p-2 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      {}
      <header className="dashboard-card-header px-5 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-md">👨‍⚖️ أداء المحامين في المكتب</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--app-warning-soft)] text-[var(--app-warning)]">
          كفاءة
        </span>
      </header>

      {}
      <div className="mt-4">
        <p className="text-sm text-[var(--app-muted)]">
          يعرض هذا المخطط عدد القضايا التي تعامل معها كل محامٍ، بالإضافة إلى
          نسبة النجاح في القضايا المغلقة.
        </p>
      </div>

      {}
      <div className="w-full h-64 sm:h-80 md:h-96 mt-4">
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default DashboardCard04;

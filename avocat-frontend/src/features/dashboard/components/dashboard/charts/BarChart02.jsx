import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useThemeProvider } from '@shared/contexts/ThemeContext';
import {
  getChartPalette,
  getChartTextColor,
  getChartGridColor,
  getChartTooltipColors,
} from '@shared/utils/themeColors';
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

function BarChart01({ data, width, height }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === 'dark';

  const colors = useMemo(() => {
    const palette = getChartPalette([
      '#6366F1',
      '#F97316',
      '#8B5CF6',
      '#10B981',
      '#F59E0B',
    ]);

    const tooltipColors = getChartTooltipColors({
      body: darkMode ? '#E5E7EB' : '#374151',
      background: darkMode ? '#1F2937' : '#fff',
      border: darkMode ? '#4B5563' : '#D1D5DB',
      title: darkMode ? '#E5E7EB' : '#374151',
    });

    return {
      textColor: getChartTextColor(darkMode ? '#E5E7EB' : '#374151'),
      gridColor: getChartGridColor(
        darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      ),
      tooltipBodyColor: tooltipColors.body,
      tooltipBgColor: tooltipColors.background,
      tooltipBorderColor: tooltipColors.border,
      barBackground: palette[2],
      barBorder: palette[0],
    };
  }, [darkMode]);

  useEffect(() => {
    if (!canvas.current) return;

    const ctx = canvas.current.getContext('2d');

    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor: colors.barBackground,
          borderColor: colors.barBorder,
          borderWidth: 1,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: colors.textColor },
            grid: { color: colors.gridColor },
          },
          x: {
            ticks: { color: colors.textColor },
            grid: { display: false },
          },
        },
        plugins: {
          tooltip: {
            backgroundColor: colors.tooltipBgColor,
            bodyColor: colors.tooltipBodyColor,
            borderColor: colors.tooltipBorderColor,
            borderWidth: 1,
          },
          legend: {
            display: true,
            labels: { color: colors.textColor },
          },
        },
      },
    });

    setChart(newChart);

    return () => newChart.destroy();
  }, [data, colors]);
  return (
    <div className="w-full h-full">
      <canvas ref={canvas} width={width} height={height}></canvas>
    </div>
  );
}

export default BarChart01;

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useThemeProvider } from '@shared/contexts/ThemeContext';
import { getChartColors } from './ChartjsConfig';
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';
import { tailwindConfig, formatValue } from '@shared/utils/Utils';

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
  const legend = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === 'dark';

  const {
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  } = useMemo(() => getChartColors(), [darkMode]);

  useEffect(() => {
    const ctx = canvas.current;
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 10,
            bottom: 10,
            left: 15,
            right: 15,
          },
        },
        scales: {
          y: {
            ticks: {
              maxTicksLimit: 4,
              callback: (value) =>
                new Intl.NumberFormat('ar-EG', {
                  style: 'currency',
                  currency: 'EGP',
                  maximumSignificantDigits: 3,
                }).format(value),
              color: darkMode ? textColor.dark : textColor.light,
              font: {
                size: 10,
              },
            },
            grid: {
              color: darkMode ? gridColor.dark : gridColor.light,
            },
          },
          x: {
            ticks: {
              color: darkMode ? textColor.dark : textColor.light,
              font: {
                size: 10,
              },
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.dataset.label}: ${new Intl.NumberFormat('ar-EG', {
                  style: 'currency',
                  currency: 'EGP',
                  maximumFractionDigits: 0,
                }).format(context.raw)}`,
            },
            bodyColor: darkMode
              ? tooltipBodyColor.dark
              : tooltipBodyColor.light,
            backgroundColor: darkMode
              ? tooltipBgColor.dark
              : tooltipBgColor.light,
            borderColor: darkMode
              ? tooltipBorderColor.dark
              : tooltipBorderColor.light,
            titleFont: {
              size: 11,
            },
            bodyFont: {
              size: 10,
            },
          },
        },
        animation: {
          duration: 400,
        },
      },
    });

    setChart(newChart);
    return () => newChart.destroy();
  }, [darkMode]);

  return (
    <div className="relative w-full h-48 sm:h-60 md:h-52 lg:h-60">
      <canvas ref={canvas} width={width} height={height}></canvas>
    </div>
  );
}

export default BarChart01;

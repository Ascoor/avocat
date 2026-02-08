import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useThemeProvider } from '@shared/contexts/ThemeContext';

import { getChartColors } from './ChartjsConfig';
import { getChartTextColor } from '@shared/utils/themeColors';
import {
  Chart,
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

import { tailwindConfig } from '@shared/utils/Utils';

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);

function DoughnutChart({ data, width, height }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === 'dark';
  const {
    tooltipTitleColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  } = useMemo(() => getChartColors(), [darkMode]);

  useEffect(() => {
    const ctx = canvas.current;
    const newChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        cutout: '70%',
        layout: { padding: 10 },
        plugins: {
          legend: { display: false },
          tooltip: {
            titleColor: darkMode
              ? tooltipTitleColor.dark
              : tooltipTitleColor.light,
            bodyColor: darkMode
              ? tooltipBodyColor.dark
              : tooltipBodyColor.light,
            backgroundColor: darkMode
              ? tooltipBgColor.dark
              : tooltipBgColor.light,
            borderColor: darkMode
              ? tooltipBorderColor.dark
              : tooltipBorderColor.light,
          },
        },
        interaction: { intersect: false, mode: 'nearest' },
        animation: { duration: 500 },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
          id: 'centerText',
          afterDraw(chart) {
            const { width, height, ctx } = chart;
            ctx.save();
            ctx.font = 'bold 18px Cairo, sans-serif';
            ctx.fillStyle = getChartTextColor(darkMode ? '#E5E7EB' : '#333');
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
            ctx.fillText(`${total} قضية`, width / 2, height / 2);
            ctx.restore();
          },
        },
      ],
    });

    setChart(newChart);
    return () => newChart.destroy();
  }, [data, darkMode]);

  return (
    <div className="relative flex justify-center items-center">
      <canvas ref={canvas} width={width} height={height}></canvas>
    </div>
  );
}

export default DoughnutChart;

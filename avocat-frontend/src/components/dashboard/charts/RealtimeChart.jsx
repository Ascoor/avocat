import React, { useRef, useEffect } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';
Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
);

function RealtimeChart({ data, width, height }) {
  const canvas = useRef(null);

  useEffect(() => {
    if (!canvas.current) return;

    const ctx = canvas.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'second',
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
        plugins: {
          tooltip: {
            mode: 'index',
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default RealtimeChart;

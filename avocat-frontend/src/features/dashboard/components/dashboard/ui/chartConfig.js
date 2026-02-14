const cssVar = (name, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value ? `hsl(${value})` : fallback;
};

export const chartPalette = () => [
  cssVar('--color-primary', '#253a9f'),
  cssVar('--color-accent', '#cf9f30'),
  cssVar('--legal-success-500', '#1f9f66'),
  cssVar('--exclusive', '#8a6ede'),
  cssVar('--primary-glow', '#4862e2'),
  cssVar('--legal-warning-500', '#d6a32e'),
];

export const baseChartOptions = () => {
  const text = cssVar('--color-muted', '#5f6879');
  const axis = cssVar('--color-text', '#1f2937');
  const grid = cssVar('--color-border', '#e3e8f2');
  const tooltipBg = cssVar('--color-surface', '#ffffff');

  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: {
        labels: {
          color: text,
          boxWidth: 10,
          boxHeight: 10,
          padding: 14,
          font: { size: 12, family: 'Cairo, Inter, sans-serif' },
        },
      },
      tooltip: {
        backgroundColor: tooltipBg,
        borderColor: grid,
        borderWidth: 1,
        titleColor: axis,
        bodyColor: axis,
        titleFont: { size: 12, family: 'Cairo, Inter, sans-serif' },
        bodyFont: { size: 12, family: 'Cairo, Inter, sans-serif' },
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: `${grid}33` },
        ticks: { color: text, font: { size: 11, family: 'Cairo, Inter, sans-serif' } },
      },
      y: {
        grid: { color: `${grid}66` },
        ticks: { color: text, font: { size: 11, family: 'Cairo, Inter, sans-serif' } },
      },
    },
  };
};

import { Chart, Tooltip } from 'chart.js';
import { tailwindConfig, hexToRGB } from '@shared/utils/Utils';
import { getCssColor } from '@shared/utils/themeColors';

Chart.register(Tooltip);

Chart.defaults.font.family = '"Cairo", sans-serif';
Chart.defaults.font.weight = 500;
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.mode = 'nearest';
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.position = 'nearest';
Chart.defaults.plugins.tooltip.caretSize = 0;
Chart.defaults.plugins.tooltip.caretPadding = 20;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.padding = 8;
Chart.defaults.color = 'var(--chart-text)';
Chart.defaults.plugins.legend.labels.color = 'var(--chart-text)';

const resolveColor = (name, fallback) => getCssColor(name, fallback);

export const chartAreaGradient = (ctx, chartArea, colorStops) => {
  if (!ctx || !chartArea || !colorStops || colorStops.length === 0) {
    return 'transparent';
  }
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top,
  );
  colorStops.forEach(({ stop, color }) => {
    gradient.addColorStop(stop, color);
  });
  return gradient;
};

export const getChartColors = () => ({
  textColor: {
    light: resolveColor('--chart-text', tailwindConfig().theme.colors.gray[400]),
    dark: resolveColor('--chart-text', tailwindConfig().theme.colors.gray[500]),
  },
  gridColor: {
    light: resolveColor('--chart-grid', tailwindConfig().theme.colors.gray[100]),
    dark: resolveColor(
      '--chart-grid',
      `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[700])}, 0.6)`,
    ),
  },
  backdropColor: {
    light: resolveColor(
      '--chart-tooltip-bg',
      tailwindConfig().theme.colors.white,
    ),
    dark: resolveColor(
      '--chart-tooltip-bg',
      tailwindConfig().theme.colors.gray[800],
    ),
  },
  tooltipTitleColor: {
    light: resolveColor(
      '--chart-tooltip-text',
      tailwindConfig().theme.colors.gray[800],
    ),
    dark: resolveColor(
      '--chart-tooltip-text',
      tailwindConfig().theme.colors.gray[100],
    ),
  },
  tooltipBodyColor: {
    light: resolveColor(
      '--chart-tooltip-text',
      tailwindConfig().theme.colors.gray[500],
    ),
    dark: resolveColor(
      '--chart-tooltip-text',
      tailwindConfig().theme.colors.gray[400],
    ),
  },
  tooltipBgColor: {
    light: resolveColor(
      '--chart-tooltip-bg',
      tailwindConfig().theme.colors.white,
    ),
    dark: resolveColor(
      '--chart-tooltip-bg',
      tailwindConfig().theme.colors.gray[700],
    ),
  },
  tooltipBorderColor: {
    light: resolveColor(
      '--chart-tooltip-border',
      tailwindConfig().theme.colors.gray[200],
    ),
    dark: resolveColor(
      '--chart-tooltip-border',
      tailwindConfig().theme.colors.gray[600],
    ),
  },
});

const getCssVarValue = (name: string, fallback = ""): string => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  return value || fallback;
};

export const getCssColor = (name: string, fallback: string): string =>
  getCssVarValue(name, fallback);

export const getChartPalette = (fallbacks: string[] = []): string[] => {
  const tokens = [
    "--chart-1",
    "--chart-2",
    "--chart-3",
    "--chart-4",
    "--chart-5",
    "--chart-6",
  ];

  return tokens.map((token, index) =>
    getCssColor(token, fallbacks[index] ?? "transparent"),
  );
};

export const getChartTextColor = (fallback: string): string =>
  getCssColor("--chart-text", fallback);

export const getChartGridColor = (fallback: string): string =>
  getCssColor("--chart-grid", fallback);

export const getChartTooltipColors = (fallbacks: {
  body: string;
  background: string;
  border: string;
  title: string;
}) => ({
  body: getCssColor("--chart-tooltip-text", fallbacks.body),
  background: getCssColor("--chart-tooltip-bg", fallbacks.background),
  border: getCssColor("--chart-tooltip-border", fallbacks.border),
  title: getCssColor("--chart-tooltip-text", fallbacks.title),
});

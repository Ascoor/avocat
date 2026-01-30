export const iconDesignTokens = {
  grid: {
    base: 20,
    padding: 2,
  },
  stroke: {
    outline24: 1.5,
    outline16: 1.25,
    filled24: 0,
  },
  cornerRadius: {
    inner: 2,
    outer: 3,
  },
  colors: {
    neutral: {
      900: '#0F1724',
      700: '#1B2742',
      500: '#314063',
      300: '#A0AEC0',
      100: '#F7F9FB',
    },
    primary: {
      700: '#2C3E9F',
      500: '#4053B8',
      300: '#7D8EE0',
    },
    success: '#0F9D58',
    warning: '#F59E0B',
    danger: '#E04444',
  },
  shadows: {
    soft: '0 16px 32px rgba(17, 24, 39, 0.18)',
    hero: '0 24px 48px rgba(15, 23, 36, 0.28)',
  },
  lightSource: {
    direction: 'top-left',
    intensity: 0.65,
  },
} as const;

export type IconDesignTokens = typeof iconDesignTokens;

// tailwind.config.ts
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* BASE SEMANTIC TOKENS */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        /* SURFACE & NEUTRAL COLORS */
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
          overlay: "hsl(var(--surface-overlay))",
        },
        neutral: {
          50: "hsl(var(--neutral-50))",
          100: "hsl(var(--neutral-100))",
          700: "hsl(var(--neutral-700))",
          900: "hsl(var(--neutral-900))",
        },

        /* BRAND COLORS */
        brand: {
          primary: "hsl(var(--brand-primary))",
          on: "hsl(var(--brand-on))",
          subtle: "hsl(var(--brand-subtle))",
        },

        /* PRIMARY & GOLD */
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          muted: "hsl(var(--gold-muted))",
          light: "hsl(var(--gold-light))",
          50: "hsl(45, 90%, 95%)",
          100: "hsl(45, 90%, 85%)",
          200: "hsl(45, 90%, 75%)",
          300: "hsl(45, 90%, 65%)",
          400: "hsl(38, 92%, 60%)",
          500: "hsl(38, 92%, 50%)",
          600: "hsl(38, 92%, 45%)",
          700: "hsl(35, 85%, 40%)",
          800: "hsl(32, 80%, 35%)",
          900: "hsl(30, 75%, 30%)",
        },

        /* ACCENT COLORS */
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          mint: "hsl(var(--accent-mint))",
          amber: "hsl(var(--accent-amber))",
        },

        /* APP SEMANTIC COLORS */
        app: {
          accent: "var(--app-accent)",
          "accent-strong": "var(--app-accent-strong)",
          muted: "var(--app-muted)",
          success: "var(--app-success)",
          warning: "var(--app-warning)",
          danger: "var(--app-danger)",
          info: "var(--app-info)",
          "accent-soft": "var(--app-accent-soft)",
          "success-soft": "var(--app-success-soft)",
          "warning-soft": "var(--app-warning-soft)",
          "info-soft": "var(--app-info-soft)",
        },

        /* CHART COLORS */
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
          6: "var(--chart-6)",
          text: "var(--chart-text)",
          grid: "var(--chart-grid)",
          tooltip: "var(--chart-tooltip-bg)",
        },

        /* EXCLUSIVE & NEON */
        exclusive: {
          DEFAULT: "hsl(var(--exclusive))",
          muted: "hsl(var(--exclusive-muted))",
          foreground: "hsl(var(--exclusive-foreground))",
          glow: "hsl(var(--exclusive-glow))",
        },
        neon: {
          DEFAULT: "hsl(var(--neon))",
          glow: "hsl(var(--neon-glow))",
          muted: "hsl(var(--neon-muted))",
        },

        /* SLATE */
        slate: {
          DEFAULT: "hsl(var(--slate))",
          light: "hsl(var(--slate-light))",
          bg: "hsl(var(--slate-bg))",
        },

        /* LEGAL SEMANTIC COLORS */
        legal: {
          primary: {
            700: "hsl(var(--legal-primary-700))",
            500: "hsl(var(--legal-primary-500))",
            300: "hsl(var(--legal-primary-300))",
          },
          neutral: {
            900: "hsl(var(--legal-neutral-900))",
            700: "hsl(var(--legal-neutral-700))",
            500: "hsl(var(--legal-neutral-500))",
            300: "hsl(var(--legal-neutral-300))",
            100: "hsl(var(--legal-neutral-100))",
          },
          success: "hsl(var(--legal-success-500))",
          warning: "hsl(var(--legal-warning-500))",
          danger: "hsl(var(--legal-danger-500))",
        },

        /* SECONDARY, MUTED, DESTRUCTIVE */
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        /* CARD & POPOVER */
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          elevated: "hsl(var(--card-elevated))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        /* SIDEBAR */
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
          "text-muted": "hsl(var(--sidebar-text-muted))",
          "hover-foreground": "hsl(var(--sidebar-hover-foreground))",
          "hover-highlight": "hsl(var(--sidebar-hover-highlight))",
          "item-hover": "hsl(var(--sidebar-item-hover-bg))",
          "item-active": "hsl(var(--sidebar-item-active-bg))",
          "subitem-hover": "hsl(var(--sidebar-subitem-hover-bg))",
          "subitem-active": "hsl(var(--sidebar-subitem-active-bg))",
        },

        /* NAVY (Static scale) */
        navy: {
          50: "hsl(222, 47%, 95%)",
          100: "hsl(222, 47%, 85%)",
          200: "hsl(222, 47%, 75%)",
          300: "hsl(222, 47%, 65%)",
          400: "hsl(222, 47%, 45%)",
          500: "hsl(222, 47%, 35%)",
          600: "hsl(222, 47%, 25%)",
          700: "hsl(222, 47%, 15%)",
          800: "hsl(222, 47%, 11%)",
          900: "hsl(222, 47%, 8%)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        DEFAULT: "var(--radius)",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
      },
      boxShadow: {
        "custom-sm": "var(--shadow-sm)",
        "custom-md": "var(--shadow-md)",
        "custom-lg": "var(--shadow-lg)",
        "custom-xl": "var(--shadow-xl)",
        "custom-2xl": "var(--shadow-2xl)",
        gold: "var(--shadow-gold)",
        neon: "var(--shadow-neon)",
        "legal-icon-soft": "var(--legal-icon-shadow-soft)",
        "legal-icon-hero": "var(--legal-icon-shadow-hero)",
        "sidebar-item": "var(--sidebar-item-active-shadow)",
        "sidebar-subitem": "var(--sidebar-subitem-shadow)",
        "sidebar-glass": "var(--sidebar-glass-shadow)",
        "sidebar-shell": "var(--sidebar-shell-shadow)",
        "header-glass": "var(--header-glass-shadow)",
        "header-shell": "var(--header-shell-shadow)",
      },
      backdropBlur: {
        "sidebar-shell": "var(--sidebar-shell-blur)",
        "header-shell": "var(--header-shell-blur)",
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-gold": "var(--gradient-gold)",
        "gradient-card": "var(--gradient-card)",
        "gradient-exclusive": "var(--gradient-exclusive)",
        "gradient-neon": "var(--gradient-neon)",
        "header-surface": "var(--header-surface-gradient)",
      },
      strokeWidth: {
        "legal-24": "var(--legal-icon-stroke-24)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;

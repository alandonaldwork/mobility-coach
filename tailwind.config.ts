import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        volt: 'rgb(var(--color-volt) / <alpha-value>)',
        ember: 'rgb(var(--color-ember) / <alpha-value>)',
        surface: {
          base: 'rgb(var(--surface-base) / <alpha-value>)',
          card: 'rgb(var(--surface-card) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
          border: 'rgb(var(--surface-border) / <alpha-value>)',
          highlight: 'rgb(var(--surface-highlight) / <alpha-value>)',
        },
        content: {
          primary: 'rgb(var(--content-primary) / <alpha-value>)',
          secondary: 'rgb(var(--content-secondary) / <alpha-value>)',
          muted: 'rgb(var(--content-muted) / <alpha-value>)',
          inverse: 'rgb(var(--content-inverse) / <alpha-value>)',
        },
        state: {
          success: 'rgb(var(--state-success) / <alpha-value>)',
          warning: 'rgb(var(--state-warning) / <alpha-value>)',
          danger: 'rgb(var(--state-danger) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-volt': 'pulse-volt 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.35s cubic-bezier(0.32,0.72,0,1)',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      },
      keyframes: {
        'pulse-volt': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        'slide-up': { from: { transform: 'translateY(100%)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'scale-in': { from: { transform: 'scale(0.9)', opacity: '0' }, to: { transform: 'scale(1)', opacity: '1' } },
      },
      boxShadow: {
        volt: 'var(--shadow-volt)',
        'volt-sm': 'var(--shadow-volt-sm)',
        card: 'var(--shadow-card)',
        elevated: 'var(--shadow-elevated)',
      },
    },
  },
  plugins: [],
}

export default config

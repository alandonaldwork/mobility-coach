import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        volt: '#C5F135',
        ember: '#FF6B35',
        surface: {
          base: '#080C0E',
          card: '#111518',
          elevated: '#1A2026',
          border: '#232D35',
          highlight: '#2C3840',
        },
        content: {
          primary: '#EEF3F8',
          secondary: '#9DAFC0',
          muted: '#6B7F8F',
          inverse: '#080C0E',
        },
        state: {
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
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
        volt: '0 0 20px rgba(197,241,53,0.25)',
        'volt-sm': '0 0 10px rgba(197,241,53,0.15)',
        card: '0 1px 3px rgba(0,0,0,0.4)',
        elevated: '0 4px 16px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}

export default config

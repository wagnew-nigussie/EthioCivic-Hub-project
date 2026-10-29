/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./server/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22'
        },
        gondar: {
          gold: '#F59E0B',
          darkgold: '#D97706',
          dark: '#0B1120',
          deep: '#030712',
          card: '#1E293B',
          border: 'rgba(255, 255, 255, 0.12)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Noto Sans Ethiopic', 'sans-serif'],
        ethiopic: ['Noto Sans Ethiopic', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.45)',
        'glow-red': '0 0 30px -5px rgba(239, 68, 68, 0.55)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
        'glass-dark': '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
        'card-elevate': '0 14px 34px -10px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06)'
      }
    }
  },
  plugins: []
}

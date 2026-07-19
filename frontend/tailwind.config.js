/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        industrial: {
          bgPrimary: 'var(--bg-primary)',
          bgSecondary: 'var(--bg-secondary)',
          bgTertiary: 'var(--bg-tertiary)',
          bgCard: 'var(--bg-card)',
          border: 'var(--border-color)',
          borderHighlight: 'var(--border-highlight)',
          textMain: 'var(--text-main)',
          textSub: 'var(--text-sub)',
          textDim: 'var(--text-dim)',
          cyan: 'var(--color-primary)',
          cyanHover: 'var(--color-primary-hover)',
          emerald: 'var(--color-success)',
          amber: 'var(--color-warning)',
          crimson: 'var(--color-danger)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
        card: 'var(--shadow-card)',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAF7EE',
          surface: '#FFFFFF',
          letter: '#EFE8DA',
          about: '#F3ECE0',
          banner: '#292D24',
          border: 'rgba(36, 40, 32, 0.14)',
          'border-focus': 'rgba(36, 40, 32, 0.3)',
        },
        ink: {
          DEFAULT: '#242820',
          muted: '#5E6357',
          faint: '#8B9084',
          inverted: '#F3EFE3',
        },
        sage: {
          DEFAULT: '#D2DCB4',
          hover: '#C4D0A0',
          text: '#263319',
          border: 'rgba(38, 51, 25, 0.2)',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Instrument Serif', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        pill: '9999px',
        card: '16px',
        input: '12px',
      },
      boxShadow: {
        'folio': '0 24px 60px -12px rgba(36, 40, 32, 0.12), 0 0 0 1px rgba(36, 40, 32, 0.08)',
        'letter-card': '0 8px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.03)',
        'pill': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'pill-hover': '0 4px 12px rgba(78, 97, 43, 0.16)',
        'cursor-preview': '0 20px 48px -8px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.15)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F6',
        primary: {
          DEFAULT: '#234D3B',
          dark: '#1B3B2D',
          light: '#2E634C',
          hover: '#1e4333',
        },
        accent: {
          DEFAULT: '#E99A48',
          dark: '#D48332',
          light: '#FDF3E7',
          hover: '#DE8C38',
        },
        secondary: {
          DEFAULT: '#E9F0E9',
          dark: '#D5E2D5',
          light: '#F4F7F4',
        },
        messText: {
          DEFAULT: '#252D27',
          muted: '#617065',
          light: '#8E9B91',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          subtle: '#F4F6F4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(35, 77, 59, 0.05), 0 4px 16px -2px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 4px 20px -2px rgba(35, 77, 59, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(35, 77, 59, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'glow-accent': '0 0 20px rgba(233, 154, 72, 0.25)',
      }
    },
  },
  plugins: [],
}


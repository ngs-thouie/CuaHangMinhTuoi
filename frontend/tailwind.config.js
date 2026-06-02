/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5a6b3c',
          light: '#7a8f52',
          dark: '#3d4a28',
        },
        secondary: {
          DEFAULT: '#8b5e3c',
          light: '#a87a52',
          dark: '#6b4428',
        },
        cream: '#f5f0eb',
        sand: '#e8e0d8',
        charcoal: '#2c2c2c',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out forwards',
      }
    },
  },
  plugins: [],
}

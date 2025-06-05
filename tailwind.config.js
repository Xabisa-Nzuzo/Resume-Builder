/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6eeff',
          100: '#ccdcff',
          200: '#99b9ff',
          300: '#6696ff',
          400: '#3373ff',
          500: '#0F52BA', // primary blue
          600: '#0c41a3',
          700: '#09318c',
          800: '#062074',
          900: '#03105d',
        },
        secondary: {
          50: '#e6f7f7',
          100: '#ccf0ef',
          200: '#99e0df',
          300: '#66d1cf',
          400: '#33c1bf',
          500: '#20B2AA', // secondary teal
          600: '#1a8f88',
          700: '#136c66',
          800: '#0d4944',
          900: '#062522',
        },
        accent: {
          50: '#f3eaff',
          100: '#e7d5ff',
          200: '#cfabfe',
          300: '#b781fe',
          400: '#9f57fd',
          500: '#8A2BE2', // accent purple
          600: '#6e22b5',
          700: '#531a88',
          800: '#37115b',
          900: '#1c092e',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-in',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
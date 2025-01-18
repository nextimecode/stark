/**
 * @type {import('tailwindcss').Config}
 */
import forms from '@tailwindcss/forms'
import preline from 'preline/plugin'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/preline/dist/*.js'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    screens: {
      xs: { max: '639px' },
      sm: '640px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1200px'
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      boxShadow: {
        signUp: '0px 5px 10px rgba(4, 10, 34, 0.2)',
        one: '0px 2px 3px rgba(7, 7, 77, 0.05)',
        sticky: 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)'
      },
      colors: {
        primary: {
          DEFAULT: '#64D2FF',
          50: '#f3fbff',
          100: '#daf4ff',
          200: '#b1e9ff',
          300: '#87ddff',
          400: '#5ed2ff',
          500: '#64D2FF',
          600: '#44b1e6',
          700: '#348bb3',
          800: '#246380',
          900: '#14334d'
        },
        secondary: {
          DEFAULT: '#0A84FF',
          50: '#e5f3ff',
          100: '#cce6ff',
          200: '#99ccff',
          300: '#66b3ff',
          400: '#3399ff',
          500: '#0A84FF',
          600: '#0076e6',
          700: '#005cb3',
          800: '#004280',
          900: '#00284d'
        }
      }
    }
  },
  plugins: [forms, preline]
}

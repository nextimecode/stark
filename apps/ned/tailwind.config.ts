// import forms from '@tailwindcss/forms'
// import preline from 'preline/plugin'
import type { Config } from 'tailwindcss'

const config: Config = {
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
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          DEFAULT: '#BF5AF2',
          50: '#B556E6',
          100: '#AC51DA',
          200: '#863FA9',
          300: '#602D79',
          400: '#4C2461',
          500: '#BF5AF2',
          600: '#391B49',
          700: '#261230',
          800: '#1D0E24',
          900: '#130918'
        },
        secondary: {
          DEFAULT: '#64D2FF',
          50: '#E3F7FF',
          100: '#C5EEFF',
          200: '#A3E4FF',
          300: '#82DAFF',
          400: '#73DBFF',
          500: '#64D2FF',
          600: '#4DAACF',
          700: '#3783A0',
          800: '#235B70',
          900: '#133648'
        }
      },
      animation: {
        'border-gradient': 'border-gradient 2.5s linear infinite',
        'hover-glow': 'hover-glow 2.5s ease-in-out infinite',
        'button-glow': 'button-glow 2.5s ease-in-out infinite'
      },
      keyframes: {
        'border-gradient': {
          '0%': { borderColor: '#FF375F' },
          '15%': { borderColor: '#BF5AF2' },
          '30%': { borderColor: '#5E5CE6' },
          '45%': { borderColor: '#0A84FF' },
          '60%': { borderColor: '#64D2FF' },
          '75%': { borderColor: '#30D158' },
          '90%': { borderColor: '#FFD60A' },
          '100%': { borderColor: '#FF9F0A' }
        },
        'hover-glow': {
          '0%, 100%': { boxShadow: '0 0 10px 2px #BF5AF2' },
          '50%': { boxShadow: '0 0 20px 4px #5E5CE6' }
        },
        'button-glow': {
          '0%, 100%': {
            backgroundColor: '#BF5AF2',
            boxShadow: '0 0 10px 2px #BF5AF2'
          },
          '50%': {
            backgroundColor: '#5E5CE6',
            boxShadow: '0 0 20px 4px #5E5CE6'
          }
        }
      }
    }
  },
  plugins: []
}
export default config

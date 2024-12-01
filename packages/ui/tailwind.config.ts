/* eslint-disable unicorn/prefer-module */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './node_modules/preline/preline.js'],
  theme: {
    extend: {
      colors: {
        red: {
          50: '#ffdad8',
          100: '#ffb5b0',
          200: '#ff8f89',
          300: '#ff6a61',
          400: '#ff453a',
          500: '#fa0e00',
          600: '#bc0a00',
          700: '#7d0700',
          800: '#3f0300',
          900: '#1f0200'
        },
        primary: '#ff453a'
      },
      fontFamily: {
        sans: 'var(--font-inter)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [require('preline/plugin'), require('@tailwindcss/forms')]
}

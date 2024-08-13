/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'gray-800': '#2d2d2d',
        'gray-900': '#1f1f1f',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Arial', 'sans-serif', 'Poppins', 'Roboto'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E3232C',
        'primary-dark': '#C41E26',
        'primary-light': '#FFF0F0',
        sidebar: '#FFFFFF',
        'content-bg': '#F2F2F2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

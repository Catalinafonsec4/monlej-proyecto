/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rosa-vino': '#4A1E28',
        'rosa-acento': '#D65A8C',
        'rosa-pastel': '#FDF2F4',
        'rosa-ultraclaro': '#FCF8F9',
        'blanco-puro': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
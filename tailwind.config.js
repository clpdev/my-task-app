/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // classによるダークモード制御を有効化
  theme: {
    extend: {},
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-lightest': '#E3FDFD',
        'primary-light': '#CBF1F5',
        'primary-DEFAULT': '#A6E3E9',
        'primary-dark': '#71C9CE',
      },
    },
  },
  plugins: [],
}
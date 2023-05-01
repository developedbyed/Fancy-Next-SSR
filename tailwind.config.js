/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-100": "#0F0F0F",
        "black-200": "#161616",
        "primary-color-100": "#FF954F",
        "primary-color-200": "#FF885A",
      },
    },
  },
  plugins: [],
}

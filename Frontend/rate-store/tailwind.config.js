/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {colors: {
        'brand-dark': '#0a0a0a',
        'brand-light': '#ffffff',
        'brand-gray': '#888888',
      },},
    },
    plugins: [],
  }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'login': '0 0 30px 5px rgba(255, 255, 255, 0.2)',
        'avatars': '0 0 30px 5px rgba(255, 255, 255, 0.5)',
        'headerUp': 'inset 0 -10px 10px 5px rgba(255, 255, 255, 0.7)',
        'headerDn': '0 10px 10px 5px rgba(255, 255, 255, 0.8)'
      }
    },
  },
  plugins: [],
}


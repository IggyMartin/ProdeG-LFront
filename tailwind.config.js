/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      'seleccionCampeona': "url('./src/assets/Fondos-de-pantalla/fondo08.jpg')"
      }
    },
  },
  plugins: [],
}


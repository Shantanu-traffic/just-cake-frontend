/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fb8263",
        secondary: "#fdc5b1",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        courgette: ['Courgette', 'cursive'],
        satisfy: ['Satisfy', 'cursive'],
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      ms: "820px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
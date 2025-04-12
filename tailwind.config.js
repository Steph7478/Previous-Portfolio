/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },

      backgroundImage: {
        start: "url('/src/assets/backgrounds/start.png')",
        skills: "url('/src/assets/backgrounds/skills.png')",
        projects: "url('/src/assets/backgrounds/projects.png')",
        earth: "url('/src/assets/decorations/earth.png')",
        textBox: "url('/src/assets/decorations/box.png')",
        nextArrow: "url('/src/assets/decorations/nextArrow.svg')",
        prevArrow: "url('/src/assets/decorations/prevArrow.svg')",

      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        bebas: ['"Bebas Neue"', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

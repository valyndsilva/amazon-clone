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
        amazonBlue: {
          light: "#232F3E",
          lighter: "#37475A",
          dark: "#398596",
          DEFAULT: "#131921",
        },
        amazonGray: "#DADADA",
        amazonYellow: {
          hover: "#F3A847",
          DEFAULT: "#F9BD69",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      // setting the color palette
      colors: {
        primary: {
          50: "#f2fbf3",
          100: "#e0f8e2",
          200: "#c2f0c7",
          300: "#92e39b",
          400: "#5bcd69",
          500: "#35b244",
          600: "#248930",
          700: "#22732c",
          800: "#1f5c27",
          900: "#1b4c23",
          950: "#0a290f",
        },
      },
    },
  },

};

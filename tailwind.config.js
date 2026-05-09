/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3fbf2",
          100: "#dcf5d9",
          200: "#bce9af",
          300: "#8ad96f",
          400: "#5fc03a",
          500: "#42a81b",
          600: "#2b8913",
          700: "#1f6c10",
          800: "#1b5f11",
          900: "#164d0f"
        }
      }
    },
  },
  plugins: [],
};

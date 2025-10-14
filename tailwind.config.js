/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✅ Hindu YUVA Theme Palette
        orange: {
          50:  "#FFF7ED",
          100: "#FFE4CC",
          200: "#FFC299",
          300: "#FFA066",
          400: "#FF7E33",
          500: "#FF6B00",   // main Hindu YUVA orange
          600: "#DB5E00",
          700: "#B85200",
          800: "#944500",
          900: "#703900",
        },
      },
    },
  },
  plugins: [],
};

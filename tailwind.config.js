/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      black: "#000",
      "red-500": "#EF4444",
      "amber-400": "#FBBF24",
      "amber-600": "#D97706",
      amber200: "#FDE68A",
      white: "#FFFFFF",
      slate100: "#F1F5F9",
      slate900: "#0F172A",
      "slate-400": "#94A3B8",
    },
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    }
  },
  plugins: [],
}
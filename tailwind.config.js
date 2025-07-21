/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "page-sections": "#F5F4F4",
        "theme-gray-font": "#696869",
        "theme-gray-border": "#D7D7D6"
      },
    },
  },
  plugins: [],
};

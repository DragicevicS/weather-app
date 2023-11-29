/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      gray: "#212121",
      teal: "#0D7377",
      lightBlue: "#14FFEC",
      white: "#e6e6e6",
    },
    fontFamily: {
      sans: ["Wix Madefor Text", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};

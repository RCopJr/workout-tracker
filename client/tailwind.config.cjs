/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

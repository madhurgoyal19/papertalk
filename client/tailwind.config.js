/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#191a23",
        "midnight-light": "#20212e",
        "midnight-highlight": "#2c2e3c",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      color: {
        primary: "#2E4BB7",
        secondary: "#3B82F6",
        tertiary: "#F4F4F4",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // add this line
  ],
};

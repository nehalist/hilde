import { nextui } from "@nextui-org/react";

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [nextui(), require("@tailwindcss/typography")],
};

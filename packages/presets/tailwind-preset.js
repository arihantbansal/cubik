/** @type {import('tailwindcss').Config} */
module.export = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      ...colors,
    },
  },
};

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5D5CDE',
        success: '#22c55e',
        warning: '#facc15',
        danger: '#ef4444',
        info: '#3b82f6',
        gray: {
          dark: '#1f2937',
          light: '#f3f4f6'
        }
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B2B377",
        secondary: "#D2D180",
        accent: "#E5E483",
        neutral: "#F1F5A8",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
        sans: ["var(--font-geist-sans)"],
        italiana: ["var(--font-italiana)"],
      },
    },
  },
  plugins: [],
} satisfies Config;

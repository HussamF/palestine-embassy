import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // تعريف ألوان هويتك الملكية
        'royal-purple': '#1e1b4b',   /* البنفسجي الغامق */
        'royal-indigo': '#312e81',   /* البنفسجي المتوسط */
        'royal-gold': '#c5a059',     /* الذهبي المعتمد */
        'gold-hover': '#b38f4d',     /* ذهبي غامق للـ hover */
      },
    },
  },
  plugins: [],
};
export default config;
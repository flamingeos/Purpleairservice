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
        brand: {
          purple: "#2e1065",
          "purple-mid": "#4c1d95",
          "purple-light": "#7c3aed",
          "purple-glow": "#a78bfa",
          blue: "#1e3a5f",
          "blue-mid": "#1d4ed8",
          "blue-baby": "#93c5fd",
          "blue-light": "#bfdbfe",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #2e1065 0%, #1e1b4b 40%, #1e3a5f 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(76,29,149,0.15) 0%, rgba(30,58,95,0.15) 100%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(167,139,250,0.25), 0 4px 24px rgba(0,0,0,0.3)",
        "glow-blue": "0 0 20px rgba(147,197,253,0.2), 0 4px 24px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;

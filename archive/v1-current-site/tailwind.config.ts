import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        backgroundElevated: "var(--background-elevated)",
        backgroundMuted: "var(--background-muted)",
        foreground: "var(--foreground)",
        foregroundMuted: "var(--foreground-muted)",
        accent: "var(--accent)",
        accentSecondary: "var(--accent-secondary)",
        success: "var(--success)"
      },
      boxShadow: {
        neon: "0 0 22px rgba(var(--accent-rgb), 0.3)",
        ringSuccess: "0 0 0 2px rgba(79, 209, 160, 0.55)",
        surface: "0 14px 34px rgba(3, 7, 16, 0.48)"
      }
    }
  },
  plugins: []
};

export default config;

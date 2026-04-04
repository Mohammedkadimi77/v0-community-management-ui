import type { Config } from "tailwindcss"

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        success: "var(--success)",
        "success-foreground": "var(--success-foreground)",
        warning: "var(--warning)",
        "warning-foreground": "var(--warning-foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config

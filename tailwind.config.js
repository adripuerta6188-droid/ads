/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
        },
        secondary: "#334155",
        accent: {
          DEFAULT: "#0369A1",
          light: "#0EA5E9",
        },
        surface: "#F8FAFC",
        foreground: "#020617",
        muted: {
          DEFAULT: "#E8ECF1",
          foreground: "#64748B",
        },
        border: "#E2E8F0",
        destructive: "#DC2626",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "80rem",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)",
        card: "0 4px 16px -4px rgb(15 23 42 / 0.08), 0 2px 6px -2px rgb(15 23 42 / 0.05)",
        lift: "0 20px 40px -12px rgb(15 23 42 / 0.18)",
        glow: "0 0 0 1px rgb(3 105 161 / 0.15), 0 8px 24px -8px rgb(3 105 161 / 0.35)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

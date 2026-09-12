/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pawapuro: {
          blue: "#1d4ed8",
          darkblue: "#1e3a8a",
          sky: "#0288d1",
          gold: "#f59e0b",
          red: "#ef4444",
          green: "#10b981",
          purple: "#8b5cf6",
          dark: "#0f172a",
          card: "#1e293b",
          border: "#334155"
        }
      }
    },
  },
  plugins: [],
}

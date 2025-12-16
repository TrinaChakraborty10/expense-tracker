/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "#121212",
          card: "#1e1e1e",
          primary: "#3b82f6",
          textPrimary: "#ffffff",
          textSecondary: "#9ca3af",
        },
        fontFamily: {
          sans: ["system-ui", "sans-serif"],
        },
      },
    },
    plugins: [],
  };  
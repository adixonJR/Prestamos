/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { keyframes: {
      cardEnter: {
        "0%": { opacity: "0", transform: "translateY(40px) scale(0.95)" },
        "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
      }
    },
    animation: {
      cardEnter: "cardEnter 0.8s ease-out forwards",
    }},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        porcelain: "#F8F7F4",
        chalk: "#FAFAF8",
        ink: "#111111",
        smoke: "#6F6F6F",
        champagne: "#C9A96A",
        line: "#E8E3D8",
        obsidian: "#0F0F0F",
      },
      boxShadow: {
        premium: "0 24px 70px rgba(17, 17, 17, 0.10)",
        glass: "0 18px 60px rgba(0, 0, 0, 0.28)",
        soft: "0 16px 40px rgba(17, 17, 17, 0.08)",
      },
      animation: {
        "slow-float": "slowFloat 7s ease-in-out infinite",
        "fade-up": "fadeUp 850ms ease both",
      },
      keyframes: {
        slowFloat: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

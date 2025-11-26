import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      containerQueries: {
        '@sm': '375px',
        '@md': '768px',
        '@lg': '1024px',
      },
      keyframes: {
        swayLeft: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        swayRight: {
          "0%, 100%": { transform: "rotate(5deg)" },
          "50%": { transform: "rotate(-5deg)" },
        },
      },
      animation: {
        swayLeft: "swayLeft 4s ease-in-out infinite",
        swayRight: "swayRight 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

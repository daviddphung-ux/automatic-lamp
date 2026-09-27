/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        cream: "#f8f6f0",
        peach: "#f4a58a",
        sage: "#91ab99",
      },
      boxShadow: {
        soft: "0 24px 55px rgba(56, 50, 40, 0.10)",
      },
    },
  },
  plugins: [],
};

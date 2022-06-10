const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        gray: colors.gray,
        "gray-neutral": colors.neutral,
        "gray-slate": colors.slate,
        "gray-stone": colors.stone,
        yellow: colors.yellow,
        orange: colors.orange,
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        layout: "min-content minmax(200px, 700px) min-content",
      },
      keyframes: {
        postAppear: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        iconAppear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1", transform: "rotate(180deg)" },
        },
        iconDisappear: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", transform: "rotate(-180deg)" },
        },
      },
      animation: {
        pulse: "pulse 1.25s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        post: "postAppear 500ms forwards",
        iconOn: "iconAppear 300ms forwards",
        iconOff: "iconDisappear 150ms forwards",
      },
      backgroundImage: {
        hero: "url('/src/assets/mockup-1000.png')",
      },
      backgroundSize: {
        90: "110%",
      },
      // screens: {
      //   landscape: { raw: "(max-height: 400px)" },
      //   // => @media (min-height: 800px) { ... }
      // },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active", "dark", "focus-within"],
    extend: {
      opacity: ["disabled"],
      cursor: ["hover"],
      fontWeight: ["hover"],
      borderWidth: ["hover", "dark"],
      borderColor: ["focus", "active", "visited", "hover", "dark"],
      rotate: ["hover", "group-hover"],
      fill: ["dark"],
    },
  },
  plugins: [require("autoprefixer")],
};

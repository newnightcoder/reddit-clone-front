module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
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
      // backgroundImage: {
      //   hero: "url('/src/assets/bg.webp')",
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
      borderColor: ["hover", "dark"],
      rotate: ["hover", "group-hover"],
      fill: ["dark"],
    },
  },
  plugins: [require("autoprefixer")],
};

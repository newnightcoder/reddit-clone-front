const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  // content: [
  //   // ...
  //   "./src/**/*.{js,ts,jsx,tsx}",
  // ],
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
      screens: {
        "2xs": "480px",
        "3xs": "362px",
      },
      gridTemplateColumns: {
        layout: "min-content minmax(240px, 600px) min-content",
        login: "70% 30%",
      },
      gridTemplateRows: {
        homepage: "1fr 5rem",
        login: "minmax(max-content, 1fr) min-content",
        main: "max-content minmax(max-content, 350px)",
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
        featherDark: "url('/src/assets/feather.svg')",
        featherLight: "url('/src/assets/feather-lightgray.svg')",
        featherBlue: "url('/src/assets/feather-blue.svg')",
        byebye: "url('/src/assets/bye.gif')",
        expired: "url('/src/assets/expired.gif')",
      },
      backgroundSize: {
        90: "110%",
        10: "10%",
      },
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

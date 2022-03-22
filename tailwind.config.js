module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        pulse: "pulse 1.25s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        hero: "url('/src/assets/bg.webp')",
      },
      colors: {
        "deep-orange-50": "#fbe9e7",
        "deep-orange-100": "#ffccbc",
        "deep-orange-200": "#ffab91",
        "deep-orange-300": "#ff8a65",
        "deep-orange-400": "#ff7043",
        "deep-orange-500": "#ff5722",
        "deep-orange-600": "#f4511e",
        "deep-orange-700": "#e64a19",
        "deep-orange-800": "#d84315",
        "deep-orange-900": "#bf360c",
        "deep-orange-100-accent": "#ff9e80",
        "deep-orange-200-accent": "#ff6e40",
        "deep-orange-400-accent": "#ff3d00",
        "deep-orange-700-accent": "#dd2c00",
        "red-100-accent": "#ff8a80",
        "red-200-accent": "#ff5252",
        "red-400-accent": "#ff1744",
        "red-700-accent": "#d50000",
        "orange-50": "#fff3e0",
        "orange-100": "#ffe0b2",
        "orange-200": "#ffcc80",
        "orange-300": "#ffb74d",
        "orange-400": "#ffa726",
        "orange-500": "#ff9800",
        "orange-600": "#fb8c00",
        "orange-700": "#f57c00",
        "orange-800": "#ef6c00",
        "orange-900": "#e65100",
        "orange-100-accent": "#ffd180",
        "orange-200-accent": "#ffab40",
        "orange-400-accent": "#ff9100",
        "orange-700-accent": "#ff6d00",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
    extend: {
      opacity: ["disabled"],
      cursor: ["hover"],
      fontWeight: ["hover"],
      borderWidth: ["hover"],
      rotate: ["hover", "group-hover"],
    },
  },
  plugins: [require("autoprefixer")],
};

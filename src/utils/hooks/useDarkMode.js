import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState(localStorage.Mode);

  const root = window.document.documentElement;

  const setMode = (theme) => {
    switch (theme) {
      case "light":
        root.classList.remove("light");
        root.classList.add("dark");
        break;
      case "dark":
        root.classList.remove("dark");
        root.classList.add("light");
        break;
      default:
    }
  };
  const toggleMode = () => {
    console.log("hook darkmode");
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("Mode", theme === "light" ? "dark" : "light");
    setMode(theme);
  };

  useEffect(() => {
    if (localStorage.Mode) {
      root.classList.add(localStorage.Mode);
    }
  }, []);

  return [theme, toggleMode];
};

export default useDarkMode;

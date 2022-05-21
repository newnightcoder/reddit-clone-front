import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/actions/user.action";

const useDarkMode = () => {
  const { darkMode } = useSelector((state) => state.user);
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const dispatch = useDispatch();
  const root = window.document.documentElement;

  const handleClassList = (isDarkMode) => {
    switch (isDarkMode) {
      case true:
        root.classList.remove("light");
        root.classList.add("dark");
        break;
      case false:
        root.classList.remove("dark");
        root.classList.add("light");
        break;
      default:
    }
  };
  const toggleMode = () => {
    console.log("hook darkmode");
    dispatch(toggleDarkMode());
    setIsDarkMode((prevState) => !prevState);
    handleClassList(isDarkMode ? true : false);
  };

  useEffect(() => {
    handleClassList(darkMode);
    setIsDarkMode(darkMode);
  }, [darkMode]);

  return [isDarkMode, toggleMode];
};

export default useDarkMode;

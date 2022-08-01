import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkModeAction } from "../../store/actions/user.action";

const useDarkMode = () => {
  const { darkMode } = useSelector((state) => state.user);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(darkMode);
  const dispatch = useDispatch();
  const root = window.document.documentElement;

  const handleClassList = useCallback(
    (isDarkMode) => {
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
    },
    [root.classList]
  );

  const toggleMode = useCallback(() => {
    dispatch(toggleDarkModeAction());
    setIsDarkMode((prevState) => !prevState);
    handleClassList(isDarkMode ? true : false);
  }, [dispatch, setIsDarkMode, handleClassList, isDarkMode]);

  useEffect(() => {
    handleClassList(darkMode);
    setIsDarkMode(darkMode);
  }, [darkMode, handleClassList]);

  return { isDarkMode, toggleMode };
};

export default useDarkMode;

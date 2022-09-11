import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { breakpoint } from "../../utils/breakpoints";
import { useWindowSize } from "../../utils/hooks";
import { SettingsProps } from "../react-app-env";

const SettingsContainer = (props: SettingsProps) => {
  const { userCreated } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const introScreens = pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname === "/fin";

  const topStyle = introScreens
    ? "top-16"
    : props.isMenuOpen
    ? "top-full"
    : width < breakpoint.md
    ? "bottom-16"
    : width < breakpoint.xl
    ? "top-[9.6rem]"
    : width >= breakpoint.xl
    ? "top-[6.6rem]"
    : "";

  const leftStyle = introScreens
    ? "left-auto"
    : props.isMenuOpen
    ? "left-0"
    : width < breakpoint.sm
    ? "right-1"
    : width < breakpoint.md
    ? "left-1/2 translate-x-1/2"
    : width < breakpoint.xl
    ? "left-16"
    : width >= breakpoint.xl
    ? "left-[14.5rem]"
    : "";

  const rightStyle = introScreens ? "right-6" : "";

  return (
    <div
      className={`${props.settingsOpen ? "block" : "hidden"} w-52 h-max ${
        props.isMenuOpen ? "relative" : "absolute"
      }  ${topStyle} ${leftStyle} ${rightStyle} z-[1500] transition duration-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 py-3 rounded-lg shadow-xl`}
    >
      {props.children}
    </div>
  );
};

export default SettingsContainer;

import React from "react";
import { useLocation } from "react-router-dom";
import { breakpoint } from "../../utils/breakpoints";
import { useWindowSize } from "../../utils/hooks";
import { SettingsProps } from "../react-app-env";

const SettingsContainer = (props: SettingsProps) => {
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const landingPage = pathname === "/";
  const loginPage = pathname === "/login";
  const signupPage = pathname === "/signup";

  const topStyle =
    landingPage || loginPage || signupPage
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

  const leftStyle =
    landingPage || loginPage || signupPage
      ? "left-auto"
      : props.isMenuOpen
      ? "left-0"
      : width < breakpoint.xxs
      ? "right-4"
      : width < breakpoint.md
      ? "left-1/2"
      : width < breakpoint.xl
      ? "left-16"
      : width >= breakpoint.xl
      ? "left-[14.5rem]"
      : "";

  const rightStyle = landingPage || loginPage || signupPage ? "right-4" : "";
  return (
    <div
      className={`${props.settingsOpen ? "inline-block" : "hidden"} ${topStyle} ${leftStyle} ${rightStyle} w-52 h-max ${
        props.isMenuOpen ? "relative" : "absolute"
      } transition duration-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 py-3 rounded-lg shadow-xl z-[1300]`}
    >
      {props.children}
    </div>
  );
};

export default SettingsContainer;

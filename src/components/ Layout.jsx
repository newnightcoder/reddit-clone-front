import React from "react";
import { useLocation } from "react-router-dom";
import useLanguage from "../utils/hooks/useLanguage";
import useToggleSettings from "../utils/hooks/useToggleSettings";
import Aside from "./Aside";
import NavBar from "./NavBar";
import NavBarDesktop from "./NavBarDesktop";

const Layout = ({ children }) => {
  const { settingsOpen, toggleSettings } = useToggleSettings();
  const [userLangData, setLanguage] = useLanguage();
  const location = useLocation();
  return (
    <div className="px-4 h-full w-full relative flex items-start justify-center border-4 border-blue-500 pt-16 bg-gray-200 dark:bg-gray-700 dark:text-white">
      <NavBar />
      <div className="w-11/12 2xl:w-3/4 border-4 border-green-500 flex items-start justify-center relative">
        <NavBarDesktop
          toggleSettings={toggleSettings}
          settingsOpen={settingsOpen}
          userLangData={userLangData}
          setLanguage={setLanguage}
        />
        {children}
        {!location.pathname.includes("profile") && <Aside />}
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import { useLocation } from "react-router-dom";
import { Aside, NavBar, NavBarDesktop } from ".";
import useLanguage from "../utils/hooks/useLanguage";
import useToggleSettings from "../utils/hooks/useToggleSettings";

const Layout = ({ children }) => {
  const { settingsOpen, toggleSettings } = useToggleSettings();
  const [userLangData, setLanguage] = useLanguage();
  const location = useLocation();
  return (
    <div className="">
      <NavBar />
      <div className="px-4 h-full w-full mt-16 relative flex items-start justify-center bg-gray-200 dark:bg-gray-700 dark:text-white">
        <div className="w-full 2xl:w-3/4 flex items-start justify-center relative">
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
    </div>
  );
};

export default Layout;

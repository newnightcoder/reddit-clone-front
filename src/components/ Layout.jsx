import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Aside, NavBar, NavBarDesktop } from ".";
import { Menu, Overlay, SessionExpiredModal } from "../components";
import { getPosts } from "../store/actions/posts.action";
import useLanguage from "../utils/hooks/useLanguage";
import useToggleSettings from "../utils/hooks/useToggleSettings";

const Layout = ({ children }) => {
  const { settingsOpen, toggleSettings } = useToggleSettings();
  const [userLangData, setLanguage] = useLanguage();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const sessionExpired = useSelector((state) => state?.posts?.sessionExpired);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionExpired) setIsExpired(true);
    console.log("session expired useEffect", sessionExpired);
  }, [sessionExpired]);

  const toggleMenu = () => {
    return setIsOpen((isOpen) => !isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    dispatch(getPosts());
  };

  const closeExpirationModal = () => {
    setIsExpired(false);
  };

  return (
    <div className="">
      <NavBar toggleMenu={toggleMenu} closeMenu={closeMenu} isOpen={isOpen} />
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
      <Overlay isOpen={isOpen} close={closeMenu} />
      <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
      <SessionExpiredModal isExpired={isExpired} close={closeExpirationModal} />
      {/* {settingsOpen && <Settings setLanguage={setLanguage} userLangData={userLangData} settingsOpen={settingsOpen} />} */}
    </div>
  );
};

export default Layout;

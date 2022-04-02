import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Aside, NavBar, NavBarDesktop } from ".";
import { Menu, Overlay, SessionExpiredModal, VisitorModal } from "../components";
import { getPosts } from "../store/actions/posts.action";
import { useLanguage, useLinkToProfile, useToggleSettings } from "../utils/hooks";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const sessionExpired = useSelector((state) => state?.posts?.sessionExpired);
  const { id, username, isAuthenticated } = useSelector((state) => state.user);

  const location = useLocation();
  const dispatch = useDispatch();
  const linkToProfile = useLinkToProfile(id, username);
  const { settingsOpen, toggleSettings } = useToggleSettings();
  const [userLangData, setLanguage] = useLanguage();

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
      <VisitorModal />
    </div>
  );
};

export default Layout;

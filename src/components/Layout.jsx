import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Aside, Menu, NavBar, NavBarDesktop, Overlay, SessionExpiredModal, VisitorModal } from ".";
import { useToggleSettings } from "../utils/hooks";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const sessionExpired = useSelector((state) => state?.posts?.sessionExpired);

  const { settingsOpen, toggleSettings } = useToggleSettings();

  useEffect(() => {
    if (sessionExpired) setIsExpired(true);
  }, [sessionExpired]);

  const toggleMenu = () => {
    return setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    // dispatch(getPosts());
  }, []);

  const closeExpirationModal = () => {
    setIsExpired(false);
  };

  return (
    <div>
      <NavBar toggleMenu={toggleMenu} />
      <div className="h-full w-full mt-16 relative flex items-start justify-center bg-gray-200 dark:bg-black dark:text-white">
        <div className={`w-full 2xl:w-3/4 md:px-12 flex items-start justify-center md:space-x-4 relative`}>
          <NavBarDesktop toggleSettings={toggleSettings} settingsOpen={settingsOpen} />
          {children}
          <Aside />
        </div>
      </div>
      <Overlay isMenuOpen={isMenuOpen} close={closeMenu} />
      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <SessionExpiredModal isExpired={isExpired} close={closeExpirationModal} />
      <VisitorModal />
    </div>
  );
};

export default Layout;

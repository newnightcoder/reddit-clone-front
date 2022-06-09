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
    <>
      <NavBar toggleMenu={toggleMenu} />
      <div className="h-full w-full mt-16 relative flex items-start justify-center transition-color duration-500 bg-gray-200 dark:bg-gray-800">
        <div
          className={`grid grid-cols-1 md:grid-cols-layout gap-x-4 lg:gap-x-8 md:px-4 justify-items-center w-full md:w-max  2xl:w-3/4 transition-color duration-500 dark:border-gray-800 relative`}
        >
          {/* flex items-start justify-center md:space-x-4  */}
          <NavBarDesktop toggleSettings={toggleSettings} settingsOpen={settingsOpen} />
          <div className="w-full">{children}</div>
          <Aside />
        </div>
      </div>
      <Overlay isMenuOpen={isMenuOpen} close={closeMenu} />
      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <SessionExpiredModal isExpired={isExpired} close={closeExpirationModal} />
      <VisitorModal />
    </>
  );
};

export default Layout;

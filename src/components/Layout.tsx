import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Aside, EditPostModal, Menu, NavBar, NavBarDesktop, Overlay, SessionExpiredModal, VisitorModal } from ".";
import { useToggle, useToggleSettings } from "../utils/hooks";

const Layout = ({ children }: { children: JSX.Element }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const { sessionExpired } = useSelector((state) => state.posts);
  const { settingsOpen, toggleSettings } = useToggleSettings();
  const toggleMenu = useToggle(isMenuOpen, setIsMenuOpen);
  const { pathname } = useLocation();
  const createPostPage = pathname === "/create";
  const editPostPage = pathname === "/edit";

  useEffect(() => {
    if (sessionExpired) setIsExpired(true);
  }, [sessionExpired]);

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
      <div className="h-full w-full mt-16 relative flex items-start justify-center transition-colors duration-500 bg-gray-200 dark:bg-black">
        <div
          className={`h-full w-full md:w-max 2xl:w-[3/4] md:px-16 xl:px-12 grid grid-cols-1 md:grid-cols-layout_lg md:gap-x-12 justify-items-center transition-color duration-500 dark:border-gray-800 relative`}
        >
          <NavBarDesktop toggleSettings={toggleSettings} toggleMenu={toggleMenu} settingsOpen={settingsOpen} />
          <div className={`${createPostPage || editPostPage ? "md:min-w-[500px]" : ""} w-full`}>{children}</div>
          <Aside />
        </div>
      </div>
      <Overlay isMenuOpen={isMenuOpen} close={closeMenu} />
      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <EditPostModal />
      <SessionExpiredModal isExpired={isExpired} close={closeExpirationModal} />
      <VisitorModal />
    </>
  );
};

export default Layout;

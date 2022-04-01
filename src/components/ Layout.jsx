import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Aside, NavBar, NavBarDesktop } from ".";
import { Menu, Overlay, SessionExpiredModal, VisitorModal } from "../components";
import { getPosts } from "../store/actions/posts.action";
import { history } from "../utils/helpers";
import { useLanguage, useLinkToProfile, useToggleSettings } from "../utils/hooks";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [visitorMessage, setVisitorMessage] = useState("");

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

  const toggleVisitorModal = (origin) => {
    setIsVisitor((prevState) => !prevState);
    if (origin) {
      switch (origin) {
        case "post": {
          return setVisitorMessage("Veuillez créer un compte pour publier un post!");
        }
        case "profile": {
          return setVisitorMessage("Veuillez créer un compte pour voir votre profil!");
        }
        case "login": {
          return setVisitorMessage("Veuillez vous inscrire pour vous connecter à Forum!");
        }
        case "post-profile": {
          return setVisitorMessage("Veuillez vous inscrire pour voir le profil des utilisateurs!");
        }
      }
    }
  };

  const handleLink = (link, userId) => {
    switch (link) {
      case "post": {
        if (!isAuthenticated) return toggleVisitorModal("post");
        return history.push("/create");
      }
      case "profile": {
        if (!isAuthenticated) return toggleVisitorModal("profile");
        return linkToProfile();
      }
      case "navbar-profile": {
        if (!isAuthenticated) return toggleVisitorModal("profile");
        return linkToProfile(id);
      }
      case "navbar-login": {
        if (!isAuthenticated) return toggleVisitorModal("login");
        return history.push("/login");
      }
      case "post-profile": {
        if (!isAuthenticated) return toggleVisitorModal("post-profile");
        return linkToProfile(userId);
      }
    }
  };

  return (
    <div className="">
      <NavBar toggleMenu={toggleMenu} closeMenu={closeMenu} isOpen={isOpen} handleLink={handleLink} />
      <div className="px-4 h-full w-full mt-16 relative flex items-start justify-center bg-gray-200 dark:bg-gray-700 dark:text-white">
        <div className="w-full 2xl:w-3/4 flex items-start justify-center relative">
          <NavBarDesktop
            toggleSettings={toggleSettings}
            toggleVisitorModal={toggleVisitorModal}
            settingsOpen={settingsOpen}
            userLangData={userLangData}
            handleLink={handleLink}
            setLanguage={setLanguage}
          />
          {children}
          {!location.pathname.includes("profile") && <Aside handleLink={handleLink} />}
        </div>
      </div>
      <Overlay isOpen={isOpen} close={closeMenu} />
      <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
      <SessionExpiredModal isExpired={isExpired} close={closeExpirationModal} />
      <VisitorModal isVisitor={isVisitor} visitorMessage={visitorMessage} toggleVisitorModal={toggleVisitorModal} />
    </div>
  );
};

export default Layout;

import { SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { Power } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logo, picPlaceholder } from "../assets";
import { history } from "../utils/helpers";
import { useHandleLink, useLanguage, useWindowSize } from "../utils/hooks";

const NavBar = ({ toggleMenu }) => {
  const location = useLocation();
  const { height, width } = useWindowSize();
  const { isAuthenticated, picUrl, username, id } = useSelector((state) => state.user);
  const handleLink = useHandleLink();
  const userLanguage = useLanguage();

  return (
    <div style={{ zIndex: 1000 }} className="h-16 w-full fixed top-0 overflow-hidden shadow-sm">
      <div className=" h-full w-full  pl-2 pr-4 flex items-center justify-between md:justify-evenly  gap-1 md:gap-2 dark:text-white shadow-md bg-gray-100 dark:bg-gray-900">
        <Link
          to="/"
          className=" h-5/6 w-max flex items-center justify-center ml-3 mr-2"
          style={{ transform: width < 768 ? "translateY(-3px)" : "translateY(-6px)" }}
        >
          <img src={logo} className="h-5/6 md:h-full" />
        </Link>

        <form className="hidden w-2/3  max-w-xl 2xl:max-w-5xl md:flex items-center justify-center rounded-l-full" action="">
          <input
            className="h-10 w-full rounded-l-full outline-none pl-3 pr-2 text-black dark:text-gray-100 dark:placeholder-gray-200 dark:bg-gray-500 text-sm lg:text-md border-t border-b border-l border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-400"
            type="search"
            placeholder={userLanguage.navbar.searchPlaceholder}
          />
          <button className="w-10 h-10 outline-none rounded-r-full bg-black dark:bg-gray-700 flex items-center justify-center border border-transparent">
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </form>
        <button
          tabIndex="0"
          className="flex flex-col items-center justify-center -space-y-0.5 outline-none bg-transparent transform translate-y-px md:transform-none lg:hidden"
          onClick={() => toggleMenu()}
        >
          <div
            className="rounded-full border border-gray-600 relative"
            style={{
              background: picUrl ? `url(${picUrl}) no-repeat center/cover` : `url(${picPlaceholder}) no-repeat center/cover`,
              height: isAuthenticated ? "2.5rem" : "2rem",
              width: isAuthenticated ? "2.5rem" : "2rem",
            }}
          >
            <div className="h-3 w-3 rounded-full z-40 absolute -bottom-px -right-px bg-green-500 border-2 border-gray-100"></div>
          </div>
          {!isAuthenticated && (
            <span className="text-gray-900 dark:text-gray-100 whitespace-nowrap text-xs transform translate-y-1 italic">
              {userLanguage.navbar.visitor}
            </span>
          )}
        </button>

        <div className="hidden w-max lg:flex items-center justify-evenly space-x-6 text-black dark:text-gray-100">
          <button
            tabIndex="0"
            className="hidden md:flex items-center justify-center gap-2 outline-none bg-transparent "
            onClick={() => handleLink("navbar-profile", id, username)}
          >
            <div
              className="w-10 h-10 rounded-full border border-gray-600"
              style={
                picUrl
                  ? { background: `url(${picUrl}) no-repeat center/cover` }
                  : {
                      background: `url(${picPlaceholder}) no-repeat center/cover`,
                    }
              }
            ></div>
            <div className="flex flex-col items-start">
              <span className="text-xs underline">{userLanguage.navbar.connected}</span>
              <span className="capitalize font-bold whitespace-nowrap">{username ? username : userLanguage.navbar.visitor}</span>
            </div>
          </button>
          <div className="flex items-center justify-center space-x-4">
            {isAuthenticated ? (
              <button
                tabIndex="0"
                className="hidden xl:flex items-center justify-center gap-1 outline-none bg-transparent transform translate-x-8 hover:underline hover:font-bold"
                onClick={() => history.push("/")}
              >
                <span className="capitalize">{userLanguage.navbar.logout}</span> <Power size={18} className="font-bold" />
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-max py-2 px-3 text-center text-sm text-white font-bold capitalize shadow rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
                  style={{ backgroundColor: "#ff4500" }}
                >
                  {userLanguage.homepage.registerBtn}
                </Link>
                <button
                  onClick={() => handleLink("navbar-login")}
                  className="w-max py-2 px-3 text-center text-sm text-white font-bold capitalize shadow bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
                >
                  {userLanguage.homepage.connectBtn}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

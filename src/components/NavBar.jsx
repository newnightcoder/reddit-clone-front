import { MenuIcon, SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { Power } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logo } from "../assets";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { history } from "../utils/helpers";
import { useHandleLink, useWindowSize } from "../utils/hooks";

const NavBar = ({ toggleMenu, closeMenu, isOpen }) => {
  const location = useLocation();
  const { height, width } = useWindowSize();
  const { isAuthenticated, picUrl, username, id } = useSelector((state) => state.user);
  const handleLink = useHandleLink();

  return (
    <div className="h-16 w-full fixed top-0 z-50 overflow-hidden">
      <div className=" h-full w-full  pl-2 pr-4 flex items-center justify-evenly  gap-1 md:gap-2 text-white shadow-md bg-gray-100">
        <Link
          to="/"
          className=" h-5/6 w-max flex items-center justify-center ml-3 mr-2"
          style={{ transform: "translateY(-6px)" }}
        >
          <img src={logo} className="h-full" />
        </Link>

        <form className="w-2/3  max-w-xl 2xl:max-w-5xl flex items-center justify-center rounded-l-full" action="">
          <input
            className="h-10 w-full rounded-l-full outline-none pl-3 pr-2 text-black text-sm lg:text-md border-t border-b border-l border-gray-200 hover:border-gray-400"
            type="search"
            placeholder="Rechercher sur Forum..."
          />
          <button className="w-10 h-10 outline-none rounded-r-full bg-black flex items-center justify-center border border-transparent">
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </form>
        <button tabIndex="0" className="outline-none bg-transparent lg:hidden" onClick={() => toggleMenu()}>
          <MenuIcon className="h-8 w-8 text-black ml-2 md:ml-0" />
        </button>

        <div className="hidden w-max lg:flex items-center justify-evenly space-x-6 text-black">
          <button
            tabIndex="0"
            className="hidden md:flex items-center justify-center gap-2 outline-none bg-transparent "
            onClick={() => handleLink("navbar-profile")}
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
              <span className="text-xs underline">Connecté</span>
              <span className="capitalize font-bold whitespace-nowrap">{username ? username : "Visitor mode"}</span>
            </div>
          </button>
          <div className="flex items-center justify-center space-x-4">
            {isAuthenticated ? (
              <button
                tabIndex="0"
                className="hidden md:flex items-center justify-center gap-1 outline-none bg-transparent transform translate-x-8 hover:underline hover:font-bold"
                onClick={() => history.push("/")}
              >
                <span>Déconnexion</span> <Power size={18} className="font-bold" />
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-max py-2 px-3 text-center text-sm text-white font-bold capitalize shadow rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
                  style={{ backgroundColor: "#ff4500" }}
                >
                  S'inscrire
                </Link>
                <button
                  onClick={() => handleLink("navbar-login")}
                  className="w-max py-2 px-3 text-center text-sm text-white font-bold capitalize shadow bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
                >
                  Se connecter
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

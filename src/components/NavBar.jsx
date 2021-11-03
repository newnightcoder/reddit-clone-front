import { ArrowLeftIcon, MenuIcon, SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo_desktop from "../assets/full-logo-row-black.svg";
import logo_mobile from "../assets/logo4.svg";
import useWindowSize from "../utils/useWindowDimensions";

const NavBar = ({ toggleMenu, closeMenu, isOpen }) => {
  const location = useLocation();
  const { height, width } = useWindowSize();

  return (
    <div className="h-16 w-full relative z-10">
      <div
        className="fixed h-16 w-full pl-2 lg:pl-8 pr-4 lg:pr-12 flex items-center justify-evenly lg:justify-center gap-1 md:gap-4 text-white shadow-md"
        style={{ backgroundColor: "#ef5350" }}
      >
        {location.pathname.includes("comments") || location.pathname.includes("profile") ? (
          <Link
            to={"/feed"}
            className="h-12 w-12 flex items-center justify-center text-white p-2 rounded-full"
            style={{ backgroundColor: "#ef5350" }}
            disabled={false}
          >
            <ArrowLeftIcon />{" "}
          </Link>
        ) : (
          <Link
            to="/"
            className="w-14 h-14 lg:w-3/12 lg:h-full flex flex-col items-center justify-center rounded-full lg:rounded-none outline-none"
          >
            <img src={width <= 1024 ? logo_mobile : logo_desktop} style={{ width: width >= 1024 && 300 }} />
          </Link>
        )}
        <form className="w-3/4 flex items-center justify-center" action="">
          <input className="h-8 w-full rounded-l outline-none" type="search" />
          <button className="w-10 h-8 rounded-r bg-black flex items-center justify-center">
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </form>
        <button tabIndex="0" className="outline-none bg-transparent md:hidden" onClick={() => toggleMenu()}>
          <MenuIcon className="h-8 w-8 text-black ml-2 md:ml-0" />
        </button>
        <div className="hidden w-1/4 md:flex items-center justify-evenly border border-black">
          <button tabIndex="0" className="hidden md:block outline-none bg-transparent" onClick={() => toggleMenu()}>
            <MenuIcon className="h-8 w-8 text-black ml-2 md:ml-0" />
          </button>
          <button tabIndex="0" className="hidden md:block outline-none bg-transparent" onClick={() => toggleMenu()}>
            <MenuIcon className="h-8 w-8 text-black ml-2 md:ml-0" />
          </button>
          <button tabIndex="0" className="hidden md:block outline-none bg-transparent" onClick={() => toggleMenu()}>
            <MenuIcon className="h-8 w-8 text-black ml-2 md:ml-0" />
          </button>
          <button tabIndex="0" className="hidden md:block outline-none bg-transparent" onClick={() => toggleMenu()}>
            <MenuIcon className="h-8 w-8 text-black ml-2 md:ml-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

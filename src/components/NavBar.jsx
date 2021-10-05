import { MenuIcon, SearchIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo4 from "../assets/logo4.svg";
import { Menu, Overlay } from "./index";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    return setIsOpen((isOpen) => !isOpen);
  };

  const closeMenu = () => {
    return setIsOpen(false);
  };

  return (
    <div className="h-16 w-screen relative z-50">
      <div
        className="fixed h-16 w-full pl-2 pr-4 flex items-center justify-evenly gap-1 text-white shadow-md"
        style={{ backgroundColor: "#ef5350" }}
      >
        <Link
          to="/"
          className="w-14 h-14 rounded-full outline-none"
          style={{ background: `url(${logo4}) no-repeat center/cover` }}
        ></Link>
        <form className="w-3/4 flex items-center justify-center" action="">
          <input className="w-full h-8 rounded-l outline-none" type="search" />
          <button className="w-10 h-8 rounded-r bg-black flex items-center justify-center">
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </form>
        <button
          tabIndex="0"
          className="outline-none bg-transparent"
          onClick={() => toggleMenu()}
        >
          <MenuIcon className="h-8 w-8 text-black ml-2 md:ml-0" />
        </button>
      </div>
      <Overlay isOpen={isOpen} close={closeMenu} />
      <Menu isOpen={isOpen} />
    </div>
  );
};

export default NavBar;

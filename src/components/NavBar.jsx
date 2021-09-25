import { MenuIcon, SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { useLocation } from "react-router-dom";
import logo4 from "../assets/logo4.svg";
// import picPlaceholder from "../assets/pic_placeholder.svg";

const NavBar = () => {
  const location = useLocation();
  const picUrl = location?.state?.picUrl;

  return (
    <div className="h-16 w-screen relative z-50">
      <div
        className="fixed h-16 w-screen pl-2 pr-4 flex items-center justify-evenly gap-1 text-white shadow-md"
        style={{ backgroundColor: "#ef5350" }}
      >
        <div
          className="w-14 h-14 rounded-full"
          style={{ background: `url(${logo4}) no-repeat center/cover` }}
        ></div>
        <form className="w-3/4 flex items-center justify-center" action="">
          <input className="w-full h-8 rounded-l outline-none" type="search" />
          <button className="w-10 h-8 rounded-r bg-black flex items-center justify-center">
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </form>
        <MenuIcon className="h-8 w-8 text-black ml-2 md:ml-0" />
      </div>
      {/* <div
        className="w-12 h-12 rounded-full border border-gray-700 absolute top-20 right-4"
        style={
          picUrl
            ? { background: `url(${picUrl}) no-repeat center/cover` }
            : { background: `url(${picPlaceholder}) no-repeat center/cover` }
        }
      ></div> */}
    </div>
  );
};

export default NavBar;

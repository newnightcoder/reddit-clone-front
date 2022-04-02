import { HomeIcon, PencilIcon, UserIcon } from "@heroicons/react/solid";
import React from "react";
import { GearFill, Power } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useHandleLink, useLanguage, useWindowSize } from "../utils/hooks";
import Settings from "./Settings";

const NavBarDesktop = ({ toggleSettings, settingsOpen }) => {
  const { id, username } = useSelector((state) => state.user);
  const { height, width } = useWindowSize();
  const { pathname } = useLocation();
  const handleLink = useHandleLink();
  const userLanguage = useLanguage();

  return (
    <div
      style={{ minWidth: width > 1024 ? "14rem" : "max-content", marginTop: pathname === "/feed" ? "6rem" : "4rem" }}
      className="hidden md:flex h-min z-30 mt-24 sticky top-20 flex-col items-center justify-center space-y-4 px-4 lg:pt-6 pb-4 whitespace-nowrap rounded-lg lg:bg-white lg:dark:bg-gray-500 lg:shadow-sm "
    >
      <Link
        style={pathname === "/feed" ? { backgroundColor: "rgb(96 165 250)", color: "white" } : null}
        to={"/feed"}
        className="h-16 w-16 lg:h-10 lg:w-full space-x-1 font-bold flex items-center justify-center lg:justify-start p-2 rounded-full transition duration-300 bg-white dark:bg-gray-500 lg:bg-transparent  lg:dark:bg-transparent hover:bg-blue-100"
        // style={{ backgroundColor: "#ef5350" }}
        disabled={false}
      >
        <HomeIcon className="h-8 w-8 lg:h-6 transform -translate-y-px" />
        <span className="capitalize hidden lg:inline-block">forum</span>
      </Link>

      <button
        onClick={() => handleLink("post")}
        style={pathname === "/create" ? { backgroundColor: "rgb(96 165 250)", color: "white" } : null}
        className="w-16 h-16 lg:w-full lg:h-10 outline-none ring-none flex items-center justify-center lg:justify-start lg:pl-1 lg:pr-4 rounded-full transition duration-300 bg-white dark:bg-gray-500 lg:bg-transparent lg:dark:bg-transparent hover:bg-blue-100"
      >
        <div className="w-16 h-16 lg:w-10 lg:h-10 rounded-full relative flex items-center justify-center">
          <span className="inline-block absolute top-0 left-0 transform translate-x-4 translate-y-2 lg:translate-x-2 lg:translate-y-0">
            +
          </span>
          <PencilIcon className="h-9 lg:h-7 w-8 transform translate-x-px" />
        </div>
        <span className="hidden lg:inline-block font-bold">{userLanguage.navbarDesktop.publish}</span>
      </button>
      <button
        style={
          pathname.includes("/profile") && pathname.includes(username)
            ? { backgroundColor: "rgb(96 165 250)", color: "white" }
            : null
        }
        className="lg:w-full outline-none ring-none flex items-center justify-center rounded-full lg:justify-start space-x-1 lg:pl-2 lg:pr-4 rounded-full bg-white lg:bg-transparent lg:dark:bg-transparent dark:bg-gray-500 transition duration-300 hover:bg-blue-100"
        onClick={() => handleLink("profile")}
      >
        <div className="w-10 h-10 lg:w-max  lg:border-0 rounded-full relative flex items-center justify-center">
          <UserIcon className="h-6 w-8" />
        </div>
        <span className="hidden lg:inline-block font-bold">{userLanguage.navbarDesktop.profile}</span>
      </button>
      <button
        style={settingsOpen ? { backgroundColor: "rgb(96 165 250)", color: "white" } : null}
        className="lg:w-full outline-none ring-none flex items-center justify-center rounded-full lg:justify-start space-x-2 lg:pl-2 lg:pr-4 rounded-full bg-white lg:bg-transparent lg:dark:bg-transparent dark:bg-gray-500 transition duration-300 hover:bg-blue-100"
        onClick={toggleSettings}
      >
        <div className="w-10 h-10 lg:w-max  lg:border-0 rounded-full relative flex items-center justify-center">
          <GearFill size={22} className="w-8" />
        </div>
        <span className="hidden lg:inline-block font-bold">{userLanguage.navbarDesktop.settings}</span>
      </button>
      <Link
        className="lg:w-full flex items-center justify-center rounded-full lg:justify-start space-x-1 lg:pl-2 lg:pr-4 rounded-full bg-white lg:bg-transparent lg:dark:bg-transparent dark:bg-gray-500 transition duration-300 hover:bg-blue-100"
        to="/"
      >
        <div className="w-10 h-10 lg:w-max  lg:border-0 rounded-full relative flex items-center justify-center">
          <Power size={25} className="w-8" />
        </div>
        <span className="hidden lg:inline-block font-bold">{userLanguage.navbarDesktop.logout}</span>
      </Link>
      <Settings settingsOpen={settingsOpen} />
    </div>
  );
};

export default NavBarDesktop;

import { HomeIcon, PencilIcon, UserIcon } from "@heroicons/react/solid";
import React from "react";
import { GearFill, Power } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
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
      // style={{
      //   marginTop: width > 768 ? "10rem" : "4rem",
      //   position: width < 768 ? "fixed" : "sticky",
      // }}
      style={{
        minWidth: width > 1024 ? "14rem" : width > 768 ? "max-content" : width < 768 ? "100%" : null,
        marginTop: width > 768 ? "12rem" : "4rem",
        top: width > 768 ? "12rem" : "",
      }}
      className="w-max flex h-16 md:h-min z-30 fixed md:sticky bottom-0 items-center justify-center border-t border-gray-200 md:border-none md:justify-start md:rounded-lg bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent shadow-xl md:shadow-none"
      // lg:bg-white lg:dark:bg-gray-500 lg:shadow-sm
    >
      <div
        style={{ width: "100%", maxWidth: width < 768 ? "550px" : null }}
        className="flex h-min md:flex-col items-center justify-evenly md:justify-center md:space-y-4 py-2 md:py-0 md:px-4 md:pb-4 whitespace-nowrap md:rounded-lg bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent"
      >
        <NavLink
          activeStyle={{ backgroundColor: "rgb(96 165 250)", color: "white" }}
          to={"/feed"}
          className="h-10 w-10 md:h-16 md:w-16 lg:h-10 lg:w-full space-x-1 font-bold flex items-center justify-center lg:justify-start p-2 rounded-full transition duration-300 text-gray-500 md:bg-white md:dark:bg-transparent md:text-black dark:text-white bg-transparent md:dark:bg-gray-500 lg:bg-transparent lg:dark:bg-transparent hover:bg-blue-400 dark:hover:bg-blue-400 hover:text-black md:hover:text-white"
        >
          <HomeIcon className="h-8 w-8 lg:h-6 transform -translate-y-px" />
          <span className="capitalize hidden lg:inline-block">forum</span>
        </NavLink>
        <button
          onClick={() => handleLink("post")}
          style={pathname === "/create" ? { backgroundColor: "rgb(96 165 250)", color: "white" } : null}
          className="h-10 w-10 md:w-16 md:h-16 lg:w-full lg:h-10 outline-none ring-none flex items-center justify-center lg:justify-start lg:pl-1 lg:pr-4 rounded-full transition duration-300 text-gray-500 md:bg-white md:dark:bg-transparent md:text-black dark:text-white bg-transparent md:dark:bg-gray-500 lg:bg-transparent lg:dark:bg-transparent hover:bg-blue-400 dark:hover:bg-blue-400 hover:text-black md:hover:text-white"
        >
          <div className="h-10 w-10 md:w-16 md:h-16 lg:w-10 lg:h-10 rounded-full relative flex items-center justify-center">
            <span className="inline-block absolute top-0 left-0 transform translate-x-1.5 md:translate-x-4 md:translate-y-2 lg:translate-x-2 lg:translate-y-0">
              +
            </span>
            <PencilIcon className="h-7 md:h-9 lg:h-7 w-8 transform translate-x-px" />
          </div>
          <span className="hidden lg:inline-block font-bold">{userLanguage.navbarDesktop.publish}</span>
        </button>
        <button
          style={
            pathname.includes("/profile") && pathname.includes(username)
              ? {
                  backgroundColor: "rgb(96 165 250)",
                  color: "white",
                }
              : null
          }
          className="lg:w-full outline-none ring-none flex items-center justify-center rounded-full lg:justify-start space-x-1 lg:pl-2 lg:pr-4 rounded-full bg-transparent md:bg-white md:dark:bg-transparent lg:bg-transparent lg:dark:bg-transparent md:dark:bg-gray-500 transition duration-300 text-gray-500 md:text-black dark:text-white hover:bg-blue-400 dark:hover:bg-blue-400 hover:text-black md:hover:text-white"
          onClick={() => handleLink("profile", id, username)}
        >
          <div className="w-10 h-10 lg:w-max  lg:border-0 rounded-full relative flex items-center justify-center">
            <UserIcon className="h-6 w-8" />
          </div>
          <span className="hidden lg:inline-block font-bold">{userLanguage.navbarDesktop.profile}</span>
        </button>
        <button
          style={settingsOpen ? { border: "2px solid rgb(96 165 250)" } : null}
          className="lg:w-full outline-none ring-none flex items-center justify-center rounded-full lg:justify-start space-x-2 lg:pl-2 lg:pr-4 rounded-full bg-transparent md:bg-white md:dark:bg-transparent lg:bg-transparent lg:dark:bg-transparent md:dark:bg-gray-500 transition duration-300 text-gray-500 md:text-black dark:text-white border-2 border-transparent hover:border-blue-400 hover:text-black"
          onClick={toggleSettings}
        >
          <div className="w-10 h-10 lg:w-max  lg:border-0 rounded-full relative flex items-center justify-center">
            <GearFill size={22} className="w-8" />
          </div>
          <span className="hidden lg:inline-block font-bold">{userLanguage.navbarDesktop.settings}</span>
        </button>
        <Link
          // style={{ color: width > 768 ? "white" : "black" }}
          className="lg:w-full flex items-center justify-center rounded-full lg:justify-start space-x-1 lg:pl-2 lg:pr-4 rounded-full bg-transparent md:bg-white md:dark:bg-transparent lg:bg-transparent lg:dark:bg-transparent md:dark:bg-gray-500 transition duration-300 text-gray-500 md:text-black dark:text-white hover:bg-blue-400 dark:hover:bg-blue-400 hover:text-black md:hover:text-white"
          to="/"
        >
          <div className="w-10 h-10 lg:w-max  lg:border-0 rounded-full relative flex items-center justify-center">
            <Power size={25} className="w-8" />
          </div>
          <span className="hidden lg:inline-block font-bold">{userLanguage.navbarDesktop.logout}</span>
        </Link>
      </div>
      <Settings settingsOpen={settingsOpen} />
    </div>
  );
};

export default NavBarDesktop;

import { HomeIcon, PencilIcon, SearchIcon, UserIcon, XIcon } from "@heroicons/react/solid";
import { GearFill, Power } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { breakpoint } from "../../utils/breakpoints";
import { history } from "../../utils/helpers";
import { useDarkMode, useHandleLink, useLanguage, useWindowSize } from "../../utils/hooks";
import Settings from "../AppSettings/Settings";
import { navbarProps } from "../react-app-env";

const NavBarDesktop = ({ toggleSettings, settingsOpen, toggleMenu }: navbarProps) => {
  const { id, username } = useSelector((state) => state.user);
  const { width } = useWindowSize();
  const { pathname } = useLocation();
  const handleLink = useHandleLink();
  const userLanguage = useLanguage();
  const { isDarkMode } = useDarkMode();
  const myProfile = pathname.includes("/profile") && pathname.includes(username);
  const createPage = pathname === "/create";

  return (
    <div
      style={{
        width: width >= breakpoint.xl ? "14rem" : width > breakpoint.md ? "min-content" : width < breakpoint.md ? "100%" : "",
        marginTop: width > breakpoint.md ? "" : "4rem",
      }}
      className="navbar-mobile fixed bottom-0 md:relative h-16 md:h-full w-full md:w-min flex items-start justify-center z-30 border-t transition duration-500 dark:border-gray-700 md:dark:border-none md:justify-start md:rounded-lg bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent shadow-xl md:shadow-none"
    >
      <div
        style={{ width: "100%", maxWidth: width < breakpoint.md ? "550px" : "", top: width > breakpoint.md ? "6rem" : "" }}
        className=" md:sticky  md:mt-24 flex h-min md:flex-col items-center justify-evenly md:justify-center md:space-y-4 py-2 md:py-0  md:pb-4 whitespace-nowrap md:rounded-lg bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent"
      >
        <NavLink
          activeStyle={{
            border: isDarkMode ? "2px solid #3B82F6" : "2px solid rgb(96 165 250)",
            color: isDarkMode ? "white" : "black",
          }}
          to={"/feed"}
          className="h-10 w-10 md:h-16 md:w-16 xl:h-10 xl:w-full space-x-1 font-bold flex items-center justify-center xl:justify-start p-2 rounded-full transition duration-300 border-2 border-transparent text-gray-500 md:bg-white md:dark:bg-transparent md:text-black dark:text-white bg-transparent md:dark:bg-gray-600 xl:bg-transparent xl:dark:bg-transparent hover:bg-blue-400 dark:hover:bg-blue-500 hover:text-black md:hover:text-white"
        >
          <HomeIcon className="h-12 md:h-8 w-8 xl:h-6 transform -translate-y-px" />
          <span className="capitalize hidden xl:inline-block">forum</span>
        </NavLink>
        <button
          onClick={() => history.push("/create")}
          style={
            createPage
              ? { border: isDarkMode ? "2px solid #3B82F6" : "2px solid rgb(96 165 250)", color: isDarkMode ? "white" : "black" }
              : undefined
          }
          className="h-10 w-10 md:w-16 md:h-16 xl:w-full xl:h-10 outline-none ring-none flex items-center justify-center xl:justify-start xl:pl-1 xl:pr-4 rounded-full transition duration-300 border-2 border-transparent text-gray-500 md:bg-white md:dark:bg-transparent md:text-black dark:text-white bg-transparent md:dark:bg-gray-600 xl:bg-transparent xl:dark:bg-transparent hover:bg-blue-400 dark:hover:bg-blue-500 hover:text-black md:hover:text-white"
        >
          <div className="h-10 w-10 md:w-16 md:h-16 xl:w-10 xl:h-10 rounded-full relative flex items-center justify-center">
            <span className="inline-block absolute top-0 left-0 transform translate-x-1.5 md:translate-x-4 md:translate-y-2 xl:translate-x-2 xl:translate-y-0">
              +
            </span>
            <PencilIcon className="h-7 md:h-9 xl:h-7 w-8 transform translate-x-px" />
          </div>
          <span className="hidden xl:inline-block font-bold">{userLanguage.navbarDesktop.publish}</span>
        </button>
        <button
          style={
            myProfile
              ? {
                  border: isDarkMode ? "2px solid #3B82F6" : "2px solid rgb(96 165 250)",
                  color: isDarkMode ? "white" : "black",
                }
              : undefined
          }
          className="xl:w-full outline-none ring-none flex items-center justify-center rounded-full xl:justify-start space-x-1 xl:pl-2 xl:pr-4 border-2 border-transparent bg-transparent md:bg-white md:dark:bg-transparent xl:bg-transparent xl:dark:bg-transparent md:dark:bg-gray-600 transition duration-300 text-gray-500 md:text-black dark:text-white hover:bg-blue-400 dark:hover:bg-blue-500 hover:text-black md:hover:text-white"
          onClick={width > breakpoint.md ? () => handleLink("profile", id!, username) : toggleMenu}
        >
          <div className="w-10 h-10 xl:w-max  xl:border-0 rounded-full relative flex items-center justify-center">
            <UserIcon className="h-7 md:h-6 w-8" />
          </div>
          <span className="hidden xl:inline-block font-bold">{userLanguage.navbarDesktop.profile}</span>
        </button>
        <NavLink
          activeStyle={{
            border: isDarkMode ? "2px solid #3B82F6" : "2px solid rgb(96 165 250)",
            color: isDarkMode ? "white" : "black",
          }}
          to="/search"
          className="md:hidden outline-none ring-none flex items-center justify-center rounded-full border-2 border-transparent bg-transparenttransition duration-300 text-gray-500 md:text-black dark:text-white hover:bg-blue-400 dark:hover:bg-blue-500 hover:text-black"
        >
          <div className="w-10 h-10 xl:w-max  xl:border-0 rounded-full relative flex items-center justify-center">
            <SearchIcon className="h-6 w-8" />
          </div>
          <span className="hidden xl:inline-block font-bold">{userLanguage.navbarDesktop.profile}</span>
        </NavLink>
        <button
          style={settingsOpen ? { border: isDarkMode ? "2px solid #3B82F6" : "2px solid rgb(96 165 250)" } : undefined}
          className="xl:w-full relative group outline-none ring-none flex items-center justify-center rounded-full xl:justify-start xl:space-x-2 xl:pl-2 xl:pr-4 border-2 border-transparent bg-transparent md:bg-white md:dark:bg-transparent xl:bg-transparent xl:dark:bg-transparent md:dark:bg-gray-600 transition duration-300 text-gray-500 md:text-black dark:text-white border-2 border-transparent hover:bg-blue-400 dark:hover:bg-blue-500 hover:text-black md:hover:text-white xl:hover:border-blue-400 xl:dark:hover:border-blue-500  xl:dark:hover:text-white"
          onClick={toggleSettings}
        >
          <div className="w-10 h-10 xl:w-max  xl:border-0 rounded-full relative flex items-center justify-center">
            <GearFill size={22} className={`w-8 group-hover:rotate-180 transition-transform duration-300 `} />
          </div>
          <span className="hidden xl:inline-block font-bold">{userLanguage.navbarDesktop.settings}</span>
          {settingsOpen && (
            <XIcon className="hidden xl:block xl:h-4 absolute animate-iconOn z-10 my-auto ml-0 xl:right-2 rounded-full" />
          )}
        </button>
        <NavLink
          className="hidden xl:w-full md:flex items-center justify-center rounded-full xl:justify-start space-x-1 xl:pl-2 xl:pr-4 bg-transparent md:bg-white md:dark:bg-transparent xl:bg-transparent xl:dark:bg-transparent md:dark:bg-gray-600 transition duration-300 text-gray-500 md:text-black dark:text-white hover:bg-blue-400 dark:hover:bg-blue-500 hover:text-black md:hover:text-white"
          to="/"
        >
          <div className="w-10 h-10 xl:w-max  xl:border-0 rounded-full relative flex items-center justify-center">
            <Power size={25} className="w-8" />
          </div>
          <span className="hidden xl:inline-block font-bold">{userLanguage.navbarDesktop.logout}</span>
        </NavLink>
        <Settings settingsOpen={settingsOpen} />
      </div>
    </div>
  );
};

export default NavBarDesktop;

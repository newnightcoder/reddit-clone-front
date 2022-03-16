import { ArrowLeftIcon, MenuIcon, SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { Power } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logo, logo_mobile } from "../assets";
import picPlaceholder from "../assets/pic_placeholder.svg";
import history from "../utils/history";
import useLinkToProfile from "../utils/useLinkToProfile";
import useWindowSize from "../utils/useWindowDimensions";

const NavBar = ({ toggleMenu, closeMenu, isOpen }) => {
  const location = useLocation();
  const { height, width } = useWindowSize();
  const { picUrl, username, id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const linkToProfile = useLinkToProfile();

  return (
    <div className="h-16 w-full relative z-50">
      <div
        className="fixed h-16 w-full  pl-2 lg:pl-8 pr-4 lg:pr-12 flex items-center justify-evenly lg:justify-center gap-1 md:gap-4 text-white shadow-md bg-deep-orange-400"
        // style={{ backgroundColor: "#ef5350" }}
      >
        {location.pathname.includes("comments") || location.pathname.includes("profile") ? (
          <div className="h-full lg:w-3/12 flex items-center justify-evenly ">
            <Link
              to={"/feed"}
              className="h-12 w-12 flex items-center justify-center text-black p-2 rounded-full"
              style={{ backgroundColor: "#ef5350" }}
              disabled={false}
            >
              <ArrowLeftIcon />
            </Link>
            {width > 1024 && (
              <Link to={"/"} className="uppercase">
                <img src={logo} style={{ width: 200 }} />
              </Link>
            )}
          </div>
        ) : (
          <Link to="/" className="w-max flex items-center justify-center">
            <img src={width < 768 ? logo_mobile : logo} width={width > 768 ? 140 : 90} />
          </Link>
        )}
        <form className="w-2/4 flex items-center justify-center" action="">
          <input
            className="h-8 w-full rounded-l outline-none px-2 text-sm lg:text-md"
            type="search"
            placeholder="Rechercher sur Groupomania (publications, collègues, etc...)"
          />
          <button className="w-10 h-8 rounded-r bg-black flex items-center justify-center">
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </form>
        <button tabIndex="0" className="outline-none bg-transparent lg:hidden" onClick={() => toggleMenu()}>
          <MenuIcon className="h-8 w-8 text-black ml-2 md:ml-0" />
        </button>

        <div className="hidden w-1/4 lg:flex items-center justify-evenly text-black ">
          <button
            tabIndex="0"
            className="hidden md:flex items-center justify-center gap-2 outline-none bg-transparent "
            onClick={() => linkToProfile(id)}
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
              <span className="capitalize font-bold">{username}</span>{" "}
            </div>
          </button>
          <button
            tabIndex="0"
            className="hidden md:flex items-center justify-center gap-1 outline-none bg-transparent transform translate-x-8 hover:underline hover:font-bold"
            onClick={() => history.push("/")}
          >
            <span>Déconnexion</span> <Power size={18} className="font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import { SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import logo4 from "../assets/logo4.svg";
import picPlaceholder from "../assets/pic_placeholder.svg";

const Feed = () => {
  const location = useLocation();
  const isNewUser = location?.state?.new && true;
  const picUrl = location?.state?.picUrl;

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-center bg-red-300 relative"
      style={{ background: `url(${logo}) no-repeat center/250%` }}
    >
      <div
        className="h-16 w-screen flex items-center justify-center gap-1 fixed top-0 left-0 text-white"
        style={{ backgroundColor: "#ef5350" }}
      >
        <div
          className="w-14 h-14 rounded-full"
          style={{ background: `url(${logo4}) no-repeat center/cover` }}
        ></div>
        <form className="w-max flex" action="">
          <input className="w-56 h-8 rounded-l" type="text" />
          <button className="w-10 h-8 rounded-r bg-black flex items-center justify-center">
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
        </form>
      </div>
      <div
        className="w-12 h-12 rounded-full border border-gray-700 absolute top-20 right-4"
        style={
          picUrl
            ? { background: `url(${picUrl}) no-repeat center/cover` }
            : { background: `url(${picPlaceholder}) no-repeat center/cover` }
        }
      ></div>
      <h1>FEED!!!</h1>
      <div className="text-center whitespace-pre">
        {isNewUser && "bienvenue sur groupomania!\non va grave s'éclater!"}
      </div>
    </div>
  );
};

export default Feed;

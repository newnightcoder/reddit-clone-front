import { PaperAirplaneIcon } from "@heroicons/react/solid";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import picPlaceholder from "../assets/pic_placeholder.svg";

const Feed = () => {
  const location = useLocation();
  const history = useHistory();
  const isNewUser = location?.state?.new && true;
  const picUrl = location?.state?.picUrl;

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-start bg-red-300 py-2 relative"
      style={{ background: `url(${logo}) no-repeat center/250%` }}
    >
      <div className="w-screen flex flex-col items-center justify-center">
        <h1>FEED!!!</h1>
        <div className="text-center whitespace-pre">
          {isNewUser && "bienvenue sur groupomania!\non va grave s'éclater!"}
        </div>
        <div className="h-16 w-11/12 flex items-center justify-evenly bg-white border border-gray-300 rounded">
          <div
            className="w-10 h-10 rounded-full border border-gray-300"
            style={
              picUrl
                ? { background: `url(${picUrl}) no-repeat center/cover` }
                : {
                    background: `url(${picPlaceholder}) no-repeat center/cover`,
                  }
            }
          ></div>
          <input
            className="h-10 w-2/3 px-2 rounded outline-none bg-gray-200 hover:bg-white border border-gray-300 hover:border-red-400 transition-all duration-200"
            type="text"
            placeholder="Exprimez-vous..."
            onClick={() =>
              setTimeout(() => {
                history.push({
                  pathname: "/create",
                  state: picUrl,
                });
              }, 250)
            }
          />
          <PaperAirplaneIcon className="h-6 w-6 text-black transform rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default Feed;

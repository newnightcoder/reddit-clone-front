import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../utils/hooks";

const HomeButtons = () => {
  const userLanguage = useLanguage();

  return (
    <div className="btns-container w-full flex flex-col items-center justify-center space-y-5">
      <div className="w-full flex flex-col items-center">
        <h2 className="uppercase whitespace-nowrap">{userLanguage.homepage.connectLbl}?</h2>
        <Link
          to="/login"
          className="w-60 py-2 text-center text-white font-bold uppercase shadow-xl bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
        >
          {userLanguage?.homepage.connectBtn}
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        <h2 className="uppercase whitespace-nowrap">{userLanguage?.homepage.registerLbl}?</h2>
        <Link
          to="/signup"
          className="w-60 py-2 text-center text-white font-bold uppercase shadow-xl bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
        >
          {userLanguage?.homepage.registerBtn}
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        <h2 className="uppercase whitespace-nowrap">{userLanguage?.homepage.exploreLbl}?</h2>
        <Link
          to="/feed"
          className="w-60 py-2 text-center text-white font-bold uppercase shadow-xl bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
        >
          {userLanguage?.homepage.exploreBtn}
        </Link>
      </div>
    </div>
  );
};

export default HomeButtons;

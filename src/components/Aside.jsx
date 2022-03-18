import React from "react";
import { useLocation } from "react-router-dom";
import { FooterAside, ModsContainer, PopularPosts, RecentUsers } from ".";
import Rules from "./Rules";

const Aside = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/feed" ? (
        <div className="hidden w-72 h-max grow shrink basis-auto lg:flex flex-col items-center justify-start gap-2">
          <RecentUsers />
          <ModsContainer />
          <PopularPosts />
          <FooterAside />
        </div>
      ) : (
        location.pathname === "/create" && (
          <div className="hidden w-72 h-max md:flex flex-col items-center justify-start space-y-3">
            <Rules />
            <div className="text-xs texgray-700 px-1">
              Veuillez respecter la <span className="text-blue-400 underline hover:cursor-pointer">politique de contenu </span> de
              Forum et bien prendre en compte
              <span className="text-blue-400 underline hover:cursor-pointer">l'esprit Forum</span>.
            </div>
            <FooterAside />
          </div>
        )
      )}
    </>
  );
};

export default Aside;

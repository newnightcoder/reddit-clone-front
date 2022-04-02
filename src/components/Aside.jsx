import React from "react";
import { useLocation } from "react-router-dom";
import { FooterAside, ModsContainer, PopularPosts, RecentUsers, Rules } from ".";

const Aside = () => {
  const { pathname } = useLocation();

  return (
    <div
      style={{ marginTop: pathname === "/feed" ? "6rem" : "4rem" }}
      className="hidden w-72 h-max lg:flex flex-col items-center justify-start gap-2"
    >
      {pathname === "/feed" ? (
        <>
          <RecentUsers />
          <ModsContainer />
          <PopularPosts />
          <FooterAside />
        </>
      ) : (
        (pathname === "/create" || pathname.includes("comments")) && (
          <>
            <Rules />
            <div className="text-xs texgray-700 px-1">
              Veuillez respecter la <span className="text-blue-400 underline hover:cursor-pointer">politique de contenu </span> de
              Forum et bien prendre en compte
              <span className="text-blue-400 underline hover:cursor-pointer">l'esprit Forum</span>.
            </div>
            {/* <FooterAside /> */}
          </>
        )
      )}
    </div>
  );
};

export default Aside;

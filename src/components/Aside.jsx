import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FooterAside, ModsContainer, PopularPosts, RecentUsers, Rules } from ".";

const Aside = () => {
  const { pathname } = useLocation();
  const element = useRef();
  const [size, setSize] = useState(null);

  useEffect(() => {
    setSize(element.current.getBoundingClientRect());
  }, []);

  return (
    <div
      ref={element}
      style={{
        marginTop: pathname === "/feed" ? "6rem" : "4rem",
        position: "sticky",
        top: `calc(100vh - ${size?.height}px - 10px)`,
      }}
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
        (pathname === "/create" || pathname.includes("comments")) && <Rules />
      )}
    </div>
  );
};

export default Aside;

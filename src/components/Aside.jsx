import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FooterAside, ModsContainer, PopularPosts, RecentUsers, Rules } from ".";

const Aside = () => {
  const { pathname } = useLocation();
  const element = useRef();
  const [size, setSize] = useState(null);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setSize(element?.current?.getBoundingClientRect());
    }, 1000);
  }, [posts]);

  return (
    <div
      ref={element}
      style={{
        marginTop: pathname === "/feed" ? "6rem" : "4rem",
        top: pathname === "/feed" ? `calc(100vh - ${size?.height}px - 10px)` : "6rem",
      }}
      className="hidden sticky w-72 h-max lg:flex flex-col items-center justify-start gap-2"
    >
      {pathname === "/feed" ? (
        <>
          <RecentUsers />
          <ModsContainer />
          <PopularPosts />
          <FooterAside />
        </>
      ) : pathname.includes("profile") ? (
        <RecentUsers />
      ) : (
        (pathname === "/create" || pathname.includes("comments")) && <Rules />
      )}
    </div>
  );
};

export default Aside;

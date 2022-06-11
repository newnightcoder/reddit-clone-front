import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FooterAside, ModsContainer, PopularPosts, RecentUsers, Rules } from ".";
import { breakpoint } from "../utils/breakpoints";
import { useWindowSize } from "../utils/hooks";

const Aside = () => {
  const { pathname } = useLocation();
  const element = useRef();
  const [size, setSize] = useState(null);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const feedPage = pathname === "/feed";
  const createPostPage = pathname === "/create";
  const commentPage = pathname.includes("comments");
  const editPostPage = pathname === "/edit";
  const profilePage = pathname.includes("profile");

  useEffect(() => {
    if (width >= breakpoint.lg) {
      setTimeout(() => {
        setSize(element?.current?.getBoundingClientRect());
      }, 500);
    }
  }, [posts, element, width]);

  return (
    <div className="hidden lg:block w-72 h-full">
      <div
        ref={element}
        style={{ top: feedPage ? `calc(100vh - ${size?.height}px - 15px)` : "6rem" }}
        className="sticky pathname w-full h-max flex flex-col items-center justify-start mt-[6rem] gap-2"
      >
        {feedPage ? (
          <>
            <RecentUsers />
            <ModsContainer />
            <PopularPosts />
            <FooterAside />
          </>
        ) : profilePage ? (
          <RecentUsers />
        ) : (
          (createPostPage || editPostPage || commentPage) && <Rules />
        )}
      </div>
    </div>
  );
};

export default Aside;

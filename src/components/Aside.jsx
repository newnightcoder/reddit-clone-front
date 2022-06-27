import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FooterAside, ModsContainer, PopularPosts, RecentUsers, Rules } from ".";
import { getMods, getRecentUsers } from "../store/actions/user.action";
import { breakpoint } from "../utils/breakpoints";
import { useWindowSize } from "../utils/hooks";

const Aside = () => {
  const { pathname } = useLocation();
  const asideContainerRef = useRef();
  const [asideContainerSize, setAsideContainerSize] = useState(null);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const feedPage = pathname === "/feed";
  const createPostPage = pathname === "/create";
  const commentPage = pathname.includes("comments");
  const editPostPage = pathname === "/edit";
  const searchPage = pathname === "/search";
  const profilePage = pathname.includes("profile");

  useEffect(() => {
    if (feedPage || profilePage) {
      dispatch(getRecentUsers());
      dispatch(getMods());
    }
  }, [dispatch, profilePage, feedPage]);

  useEffect(() => {
    if (width >= breakpoint.lg) {
      setTimeout(() => {
        setAsideContainerSize(asideContainerRef?.current?.getBoundingClientRect());
      }, 500);
    }
  }, [posts, asideContainerRef, width]);

  return (
    <div className={`hidden lg:block w-72 h-full`}>
      <div
        ref={asideContainerRef}
        style={{ top: feedPage ? `calc(100vh - ${asideContainerSize?.height}px - 15px)` : "6rem" }}
        className="sticky pathname w-full h-max flex flex-col items-center justify-start mt-[6rem] gap-2"
      >
        {feedPage ? (
          <>
            <RecentUsers />
            <ModsContainer />
            <PopularPosts />
            <FooterAside />
          </>
        ) : profilePage || searchPage ? (
          <RecentUsers />
        ) : (
          (createPostPage || editPostPage || commentPage) && <Rules />
        )}
      </div>
    </div>
  );
};

export default Aside;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FooterAside, ModsContainer, PopularPosts, RecentUsers, Rules } from "../..";
import { getModsAction, getRecentUsersAction } from "../../../store/actions/user.action";
import { breakpoint } from "../../../utils/breakpoints";
import { useWindowSize } from "../../../utils/hooks";

const Aside = () => {
  const { pathname } = useLocation();
  const asideContainerRef = useRef<HTMLDivElement>(null);
  const [asideContainerSize, setAsideContainerSize] = useState<DOMRect | null>(null);
  const { posts } = useSelector((state) => state.posts);
  const { recentUsers, mods } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const feedPage = pathname === "/feed";
  const createPostPage = pathname === "/create";
  const commentPage = pathname.includes("comments");
  const editPostPage = pathname === "/edit";
  const searchPage = pathname === "/search";
  const profilePage = pathname.includes("profile");

  useEffect(() => {
    if (width >= breakpoint.lg && recentUsers.length === 0) {
      dispatch(getRecentUsersAction());
    }
  }, [dispatch, width, recentUsers.length]);

  useEffect(() => {
    if (width >= breakpoint.lg && mods.length === 0) {
      dispatch(getModsAction());
    }
  }, [dispatch, width, mods.length]);

  useEffect(() => {
    if (width >= breakpoint.lg) {
      setTimeout(() => {
        if (asideContainerRef.current) return setAsideContainerSize(asideContainerRef.current.getBoundingClientRect());
      }, 500);
    }
  }, [posts, asideContainerRef, width]);

  return (
    <div className={`hidden lg:block w-[16rem] xl:w-[18rem] h-full`}>
      <div
        ref={asideContainerRef}
        style={{ top: feedPage ? `calc(100vh - ${asideContainerSize?.height}px - 15px)` : "6rem" }}
        className="sticky pathname w-full h-max flex flex-col items-center justify-start mt-[6rem] space-y-2"
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

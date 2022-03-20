import { PaperAirplaneIcon, RefreshIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { Aside, NavBarDesktop, Post } from "../components";
import PostSkeleton from "../components/PostSkeleton";
import { clearTempPostImg, getPosts, getUsers } from "../store/actions/posts.action";
import history from "../utils/history";

const Feed = ({ toggleOptions, optionsOpen, openModal, toggleDeleteModal }) => {
  const [newUser, setNewUser] = useState(false);
  const user = useSelector((state) => state.user);
  const { isAuthenticated, isNewUser } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    setNewUser(isNewUser);
    return function cleanup() {
      setNewUser(null);
    };
  }, [isNewUser]);

  useEffect(() => {
    dispatch(clearTempPostImg());
    // setTimeout(() => {
    dispatch(getPosts());
    dispatch(getUsers());
    // }, 2000);
  }, []);

  return (
    <div className="h-max">
      {!isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <div className="feed-container h-full w-full flex flex-col items-center justify-start gap-6 bg-gray-200 relative pt-6">
          <div className="bienvenueMsg-newcomer text-center whitespace-pre mb-2">
            {newUser === true ? (
              <span className="font-bold">
                Bienvenue <span className="capitalize">{user.username}!</span>
                <br />
                Échangez entre collègues.
              </span>
            ) : newUser === false ? (
              <span className="font-bold">
                Content de vous revoir&nbsp;
                <span className="capitalize">{user.username}!</span>
              </span>
            ) : null}
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <button
              className="refreshBtn outline-none hover:cursor-pointer	bg-blue-500 text-white rounded-full gap-1 flex items-center justify-center pl-2 pr-3 py-1 shadow transition-all duration-300 hover:bg-black hover:shadow-none group"
              onClick={() => dispatch(getPosts())}
              style={{ opacity: posts && posts.length !== 0 ? 1 : 0 }}
            >
              <RefreshIcon className="h-4 w-4 pointer-events-auto transform transition-transform duration-500 group-hover:-rotate-180" />
              <span className="text-xs pointer-events-auto">rafraîchir</span>
            </button>
            <div className="posts-aside-container w-full md:w-11/12 max-w-7xl flex items-start justify-center md:gap-8">
              <NavBarDesktop />
              <div className="posts-section-container w-full md:w-3/4 xl:w-2/3 flex flex-col items-center justify-center pb-20 relative">
                <div className="posts-wrapper h-full w-full relative flex flex-col items-center justify-center gap-4 pb-6">
                  {posts?.length === 0 || posts === undefined ? (
                    <PostSkeleton />
                  ) : (
                    posts.map((post) => (
                      <Post
                        key={post.postId}
                        post={post}
                        toggleOptions={toggleOptions}
                        optionsOpen={optionsOpen}
                        openModal={openModal}
                        toggleDeleteModal={toggleDeleteModal}
                      />
                    ))
                  )}
                </div>
              </div>
              <Aside />
            </div>
          </div>
          <div className="createpost-link-bottom md:hidden w-full fixed bottom-0 left-0 flex flex-col items-center justify-center mt-1 md:mt-2 md:mb-4 md:px-6 bg-gray-300 md:bg-white border-t border-gray-600 md:border-t-0 md:rounded md:shadow z-10">
            <div className="h-16 w-full md:w-5/6 flex items-center justify-evenly md:justify-center md:gap-3 ">
              <div
                className="w-10 h-10 rounded-full border border-gray-600"
                style={
                  user.picUrl
                    ? { background: `url(${user.picUrl}) no-repeat center/cover` }
                    : {
                        background: `url(${picPlaceholder}) no-repeat center/cover`,
                      }
                }
              ></div>
              <input
                className="h-10 w-2/3 md:w-full px-2 rounded outline-none bg-white border border-gray-600 hover:border-red-400 transition-all duration-200"
                type="text"
                placeholder="Exprimez-vous..."
                onClick={() =>
                  setTimeout(() => {
                    history.push("/create");
                  }, 250)
                }
              />
              <PaperAirplaneIcon className="h-6 w-6 text-black transform rotate-45" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;

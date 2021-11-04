import { PaperAirplaneIcon, RefreshIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { Aside, Post } from "../components";
import PostSkeleton from "../components/PostSkeleton";
import { getPosts } from "../store/actions/posts.action";
import history from "../utils/history";

const Feed = ({ toggleOptions, optionsOpen, openModal, toggleDeleteModal }) => {
  const [newUser, setNewUser] = useState(false);
  const isNewUser = useSelector((state) => state.user.isNewUser);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts.posts);
  const isAuthenticated = useSelector((state) => state.user.loginSuccess);
  const dispatch = useDispatch();

  useEffect(() => {
    setNewUser(isNewUser);
    return function cleanup() {
      setNewUser(null);
    };
  }, [isNewUser]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getPosts());
    }, 2000);
  }, [dispatch]);

  return (
    <div className="h-max">
      {!isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <div className="feed-container h-full w-full flex flex-col items-center justify-start bg-gray-200 relative pt-3">
          <div className="bienvenueMsg-newcomer text-center whitespace-pre mb-2">
            {newUser === true ? (
              <>
                Bienvenue <span className="capitalize">{user.username}!</span>
                <br />
                Échangez entre collègues.
              </>
            ) : newUser === false ? (
              <>
                Content de vous revoir&nbsp;
                <span className="capitalize">{user.username}!</span>
              </>
            ) : null}
          </div>
          <div className="createpost-link-bottom w-full md:w-11/12 lg:w-2/3 2xl:w-1/2 fixed bottom-0 left-0 md:relative flex flex-col items-center justify-center mt-1 md:mt-2 md:mb-4 md:px-6 bg-gray-300 md:bg-white border-t border-gray-600 md:border-t-0 md:rounded md:shadow z-10">
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
                className="h-10 w-2/3 md:w-full px-2 rounded outline-none bg-gray-200 hover:bg-gray-100 border border-gray-600 hover:border-red-400 transition-all duration-200"
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
          <div className="posts-aside-container w-full md:w-11/12 lg:w-2/3 2xl:w-1/2 flex items-start justify-center md:gap-8">
            <div className="posts-section-container w-full md:w-3/4 xl:w-2/3 flex flex-col items-center justify-center pt-3 pb-20 relative">
              <button
                className="refreshBtn outline-none hover:cursor-pointer	bg-black text-white rounded-md gap-1 transition-opacity duration-1000 delay-200 flex items-center justify-center absolute right-7 top-0 px-2 py-1"
                onClick={() => dispatch(getPosts())}
                style={{ opacity: posts && posts.length !== 0 ? 1 : 0 }}
              >
                <RefreshIcon className="h-4 w-4 pointer-events-auto" />{" "}
                <span className="text-xs pointer-events-auto">rafraîchir</span>
              </button>
              <div className="posts-wrapper h-full w-full relative flex flex-col items-center justify-center gap-4 py-6">
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
      )}
    </div>
  );
};

export default Feed;

import { RefreshIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Post, Skeleton } from "../components";
import { clearTempPostImg, clearTempPreview, getLikes, getPosts } from "../store/actions/posts.action";
import { useContainerSize, useError, useLanguage } from "../utils/hooks";

const Feed = () => {
  const user = useSelector((state) => state.user);
  const { isAuthenticated, isNewUser, liked } = useSelector((state) => state.user);
  const posts = useSelector((state) => state?.posts?.posts);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const error = useError();
  const postsContainer = useRef();
  const size = useContainerSize(postsContainer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(clearTempPostImg());
    dispatch(clearTempPreview());
    // dispatch(clearLastAdded());
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLikes());
  }, [liked]);

  return (
    <Layout>
      <div className="feed-container h-full w-full flex flex-col items-center justify-start space-y-2 transition-color text-black dark:text-blue-500 duration-500 relative">
        {error && (
          <span className="whitespace-pre w-full md:w-max h-max py-2 px-3 text-sm md:text-sm text-white transition duration-500 bg-black dark:bg-white dark:text-black text-center rounded">
            {error}
          </span>
        )}
        <div className="bienvenueMsg-newcomer w-full h-16 flex items-center justify-center text-center whitespace-pre mb-2">
          {!isAuthenticated ? (
            <span className="font-bold">{userLanguage?.feed.greetingVisitorMode}&nbsp;</span>
          ) : isNewUser ? (
            <span className="font-bold">
              {userLanguage?.feed.greetingVisitor1} <span className="capitalize">{user.username}!</span>
              <br />
              {userLanguage?.feed.greetingVisitor2}
            </span>
          ) : (
            <span className="font-bold">
              {userLanguage?.feed.greetingUser}&nbsp;
              <span className="capitalize">{user.username}!</span>
            </span>
          )}
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
          <div className="posts-aside-container w-full flex items-start justify-center pt-2 md:space-x-8 -translate-y-6">
            <div className="posts-section-container w-full flex flex-col items-center justify-center pb-20 relative">
              <div style={{ width: `${size}` }} className="h-6 flex items-center justify-end mb-2 pr-4 md:pr-0">
                <button
                  className="h-6 refreshBtn outline-none hover:cursor-pointer	bg-blue-500 text-white rounded-full flex items-center justify-center space-x-1 pl-2 pr-3 py-1 shadow transition duration-300 hover:bg-black hover:shadow-none group"
                  onClick={() => dispatch(getPosts())}
                  style={{ opacity: posts && posts.length !== 0 ? 1 : 0 }}
                >
                  <RefreshIcon className="h-4 w-4 pointer-events-auto transform transition-transform duration-500 group-hover:-rotate-180" />
                  <span className="text-xs pointer-events-auto capitalize">{userLanguage?.feed.refreshBtn}</span>
                </button>
              </div>
              <div
                ref={postsContainer}
                className="posts-wrapper h-full w-full relative flex flex-col items-center justify-center space-y-4 pb-6"
              >
                {posts.length === 0 ? (
                  <Skeleton element="post" number={8} />
                ) : (
                  posts.map((post) => <Post key={post.postId} post={post} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Feed;

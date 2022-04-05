import { RefreshIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Post, Skeleton } from "../components";
import { getPosts, getUsers } from "../store/actions/posts.action";
import { useLanguage } from "../utils/hooks";

const Feed = () => {
  const [newUser, setNewUser] = useState(false);
  const user = useSelector((state) => state.user);
  const { isAuthenticated, isNewUser } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    setNewUser(isNewUser);
    return function cleanup() {
      setNewUser(null);
    };
  }, [isNewUser]);

  useEffect(() => {
    // dispatch(clearTempPostImg());
    dispatch(getPosts());
    dispatch(getUsers());
  }, []);

  return (
    <Layout>
      <div className="feed-container h-full w-full shrink flex flex-col items-center justify-start gap-2 transition duration-500 relative pt-4">
        <div className="h-max bienvenueMsg-newcomer text-center whitespace-pre mb-2">
          {newUser ? (
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
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="posts-aside-container w-full md:w-11/12 max-w-7xl flex items-start justify-center pt-2 md:gap-8 transform -translate-y-6">
            <div className="posts-section-container w-full flex flex-col items-center justify-center pb-20 relative">
              <div className="w-11/12 md:w-full max-w-3xl h-6 flex items-center justify-end mb-2">
                <button
                  className="h-6 refreshBtn outline-none hover:cursor-pointer	bg-blue-500 text-white rounded-full gap-1 flex items-center justify-center pl-2 pr-3 py-1 shadow transition-all duration-300 hover:bg-black hover:shadow-none group"
                  onClick={() => dispatch(getPosts())}
                  style={{ opacity: posts && posts.length !== 0 ? 1 : 0 }}
                >
                  <RefreshIcon className="h-4 w-4 pointer-events-auto transform transition-transform duration-500 group-hover:-rotate-180" />
                  <span className="text-xs pointer-events-auto capitalize">{userLanguage?.feed.refreshBtn}</span>
                </button>
              </div>
              <div className="posts-wrapper h-full w-full relative flex flex-col items-center justify-center gap-4 pb-6">
                {posts?.length === 0 || posts === undefined ? (
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

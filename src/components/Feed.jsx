import { PaperAirplaneIcon, RefreshIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.svg";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { getPosts } from "../store/actions/posts.action";
import { Post } from "./index";
import PostSkeleton from "./PostSkeleton";

const Feed = () => {
  const [newUser, setNewUser] = useState(false);
  const isNewUser = useSelector((state) => state.user.isNewUser);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts.posts);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setNewUser(isNewUser);
  }, [isNewUser]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getPosts());
    }, 2000);
  }, [dispatch]);

  return (
    <div
      className="feed-container min-h-screen w-screen flex flex-col items-center justify-start bg-red-300 relative pt-3"
      style={{ background: `url(${logo}) no-repeat fixed center/250%` }}
    >
      <div className="bienvenueMsg-newcomer text-center whitespace-pre mb-2">
        {newUser ? (
          <>
            Bienvenue <span className="capitalize">{user.username}!</span>
            <br />
            Échangez entre collègues.
          </>
        ) : !newUser ? (
          <>
            Content de vous revoir&nbsp;
            <span className="capitalize">{user.username}!</span>
          </>
        ) : null}
      </div>
      <div className="posts-section-container w-full md:w-1/2 xl:w-1/3 flex flex-col items-center justify-center pt-3 pb-20 relative">
        <button
          className="refreshBtn outline-none bg-black text-white rounded-md gap-1 transition-opacity duration-1000 delay-200 flex items-center justify-center absolute right-7 top-0 px-2 py-1"
          onClick={() => dispatch(getPosts())}
          style={{ opacity: posts.length !== 0 ? 1 : 0 }}
        >
          <RefreshIcon className="h-4 w-4" /> <span className="text-xs">rafraîchir</span>
        </button>
        <div className="posts-wrapper h-full w-full flex flex-col items-center justify-center gap-4 py-6">
          {posts.length === 0 ? (
            <PostSkeleton />
          ) : (
            posts.map((post) => <Post key={post.postId} post={post} />)
          )}
        </div>
        <div className="createpost-link-bottom w-full fixed bottom-0 left-0 flex flex-col items-center justify-center mt-1 bg-gray-400 border border-gray-300 ">
          <div className="h-16 w-full lg:w-2/3 flex items-center justify-evenly md:justify-center md:gap-3 ">
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
              className="h-10 w-2/3 px-2 rounded outline-none bg-gray-200 hover:bg-white border border-gray-600 hover:border-red-500 transition-all duration-200"
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
    </div>
  );
};

export default Feed;

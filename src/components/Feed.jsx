import { PaperAirplaneIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { API_POST } from "./API";
import { Post } from "./index";
import PostSkeleton from "./PostSkeleton";

const Feed = () => {
  const location = useLocation();
  const history = useHistory();
  const isNewUser = history?.state?.new && true;
  const picUrl = location?.state?.picUrl;
  const userId = location?.state?.userId;

  const [posts, setPosts] = useState([]);

  const request = {
    method: "get",
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(API_POST, request);
      const data = await response.json();
      const unshiftPosts = [];
      data.posts.forEach((post) => {
        unshiftPosts.unshift(post);
      });
      setPosts(unshiftPosts);
    };
    fetchPosts();
  }, []);
  // setIsLoading(false);

  return (
    <div
      className="h-full w-screen flex flex-col items-center justify-start bg-red-300 relative"
      style={{ background: `url(${logo}) no-repeat fixed center/250%` }}
    >
      <div className="w-screen flex flex-col items-center justify-center">
        <div className="w-screen fixed bottom-0 flex flex-col items-center justify-center mt-1">
          <div className="text-center whitespace-pre">
            {isNewUser && "bienvenue sur groupomania!\non va grave s'éclater!"}
          </div>
          <div className="h-16 w-full flex items-center justify-evenly bg-gray-400 border border-gray-300 rounded">
            <div
              className="w-10 h-10 rounded-full border border-gray-600"
              style={
                picUrl
                  ? { background: `url(${picUrl}) no-repeat center/cover` }
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
                  history.push({
                    pathname: "/create",
                    state: {
                      picUrl,
                      userId,
                    },
                  });
                }, 250)
              }
            />
            <PaperAirplaneIcon className="h-6 w-6 text-black transform rotate-45" />
          </div>
        </div>

        <div className="h-full w-full flex flex-col items-center justify-center gap-4 py-4">
          {posts.length !== 0 ? (
            posts.map((post) => <Post key={post.postId} post={post} />)
          ) : (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;

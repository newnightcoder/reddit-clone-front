import React from "react";
import picPlaceholder from "../assets/pic_placeholder.svg";

const picUrl = "";

const Post = ({ post }) => {
  return (
    <div className="h-max w-11/12 flex flex-col items-center justify-center bg-white border border-gray-300 rounded">
      <div
        className="w-10 h-10 rounded-full border border-gray-300"
        style={
          picUrl !== ""
            ? { background: `url(${picUrl}) no-repeat center/cover` }
            : {
                background: `url(${picPlaceholder}) no-repeat center/cover`,
              }
        }
      ></div>
      <div>{post.username}</div>
      <div>{post.title}</div>
      <div>{post.text}</div>
      <div>{post.date}</div>
    </div>
  );
};

export default Post;

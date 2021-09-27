import React from "react";

const PostSkeleton = () => {
  return (
    <div className="post-container relative h-40 w-11/12 flex-col items-center justify-center bg-white border border-gray-400 rounded-md px-2 pt-2">
      <div className="top w-full flex items-center justify-center pb-1 border-b border-gray-400">
        <div className="left-column h-full w-2/12 flex justify-center">
          <div className="avatar-container w-11 h-11 bg-gray-400 rounded-full border border-gray-300"></div>
        </div>
        <div className="right-column  h-full w-10/12 flex flex-col items-center justify-center">
          <div className="username-title-container h-12 w-full flex flex-col items-start justify-evenly pl-1 pr-3">
            <div className="username-date h-6 w-full bg-gray-400 rounded"></div>
            <div className="h-4 w-full bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
      <div className="bottom absolute bottom-0 left-0 w-10-12 h-6 w-full bg-gray-400 rounded-b "></div>
    </div>
  );
};

export default PostSkeleton;

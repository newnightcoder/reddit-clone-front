import React from "react";

const PostElement = () => {
  return (
    <div className="container h-32 w-11/12 flex items-center justify-center bg-white border border-gray-300 rounded-md px-2 pt-2">
      <div className="post-container animate-pulse relative h-full w-full flex-col items-center justify-center bg-white">
        <div className="top w-full flex items-center justify-center pb-1 border-b border-gray-300">
          <div className="left-column h-full w-2/12 flex justify-center">
            <div className="avatar-container w-11 h-11 bg-gray-300 rounded-full border border-gray-300"></div>
          </div>
          <div className="right-column  h-full w-10/12 flex flex-col items-center justify-center">
            <div className="username-title-container h-14 w-full flex flex-col items-start justify-evenly pl-1 pr-3">
              <div className="username-date h-6 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <div className="bottom h-6 w-full flex items-center justify-end absolute bottom-1 right-5 rounded-b">
          <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const PostSkeleton = () => {
  return (
    <>
      <PostElement />
      <PostElement />
      <PostElement />
      <PostElement />
      <PostElement />
      <PostElement />
      <PostElement />
      <PostElement />
    </>
  );
};

export default PostSkeleton;

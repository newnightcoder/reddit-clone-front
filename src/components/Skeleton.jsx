import React from "react";

const PostSkeleton = () => {
  return (
    <div className="container h-32 w-11/12 md:w-full max-w-3xl flex items-center justify-center bg-white border border-gray-300 rounded-md px-2 pt-2">
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

const UserCardSkeleton = ({ mod }) => {
  return (
    <div className="w-72 h-24 lg:flex flex-col items-center justify-start gap-2">
      <div className="flex gap-2 items-center justify-start hover:underline hover:font-bold">
        <div className="h-14 w-14 rounded-full bg-gray-500 border-2 border-blue-400 p-1 hover:border-red-400 transition duration-300"></div>
        <span className="capitalize"></span>
      </div>
      {!mod && <span className="w-full flex justify-center text-xs italic"></span>}
    </div>
  );
};

const Skeleton = ({ element, number, mod }) => {
  let arrayOfSkeletons = new Array(number).fill(number, 0, number);
  console.log(arrayOfSkeletons);
  return (
    <>
      {element === "post"
        ? arrayOfSkeletons.map((sk, i) => <PostSkeleton key={i} />)
        : element === "user" && arrayOfSkeletons.map((sk, i) => <UserCardSkeleton key={i} mod={mod} />)}
    </>
  );
};

export default Skeleton;

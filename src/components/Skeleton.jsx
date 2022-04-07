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
    <div className="w-72 h-24 lg:flex flex-col items-center justify-start gap-2 animate-pulse px-3 py-2">
      <div className="w-full flex gap-2 items-center justify-start hover:underline hover:font-bold">
        <div className="h-14 w-14 rounded-full flex items-center justify-center border-2 border-blue-400 p-1 hover:border-red-400 transition duration-300">
          <div className="h-11 w-11 rounded-full bg-gray-300"></div>
        </div>
        <span className="h-5 w-2/3 bg-gray-300 rounded"></span>
      </div>
      {!mod && <span className="h-3 w-1/2 self-center bg-gray-300 flex justify-center rounded"></span>}
    </div>
  );
};

const ProfileSkeleton = () => {
  return (
    <div className="bg-white h-screen w-full md:w-5/6 rounded md:mt-8 pt-10 flex flex-col items-center justify-start gap-2 pb-12 ">
      <div className="animate-pulse top-section h-max w-10/12 pb-2 flex flex-col items-center justify-start gap-2 border-b border-gray-300">
        <div className="avatar-container h-max w-full flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border border-gray-400 bg-gray-300"></div>
        </div>
        <div className="username-member h-max w-full flex flex-col items-center justify-start space-y-2 pt-2 pb-1">
          <span className="h-6 w-40 rounded bg-gray-300 text-xl font-bold capitalize"></span>
          <span className="h-4 w-40 rounded bg-gray-300 block italic text-sm flex items-center justify-center"></span>
        </div>
      </div>
      {/* <div className="h-10 w-48 rounded-full bg-gray-300 shadow-sm"></div> */}
      <div className="animate-pulse w-10/12 flex flex-col items-center justify-center">
        <h2 className="h-6 w-36 bg-gray-300 rounded mt-12"></h2>
        {/* <div className="w-full md:w-2/3 max-w-3xl flex flex-col items-center justify-center gap-3 pt-4">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div> */}
      </div>
    </div>
  );
};

const Skeleton = ({ element, number, mod }) => {
  let arrayOfSkeletons = new Array(number).fill(number, 0, number);
  return (
    <>
      {element === "post"
        ? arrayOfSkeletons.map((sk, i) => <PostSkeleton key={i} />)
        : element === "user"
        ? arrayOfSkeletons.map((sk, i) => <UserCardSkeleton key={i} mod={mod} />)
        : element === "profile" && arrayOfSkeletons.map((sk, i) => <ProfileSkeleton key={i} />)}
    </>
  );
};

export default Skeleton;

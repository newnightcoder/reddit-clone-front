import { SkeletonProps } from "../react-app-env";

const PostSkeleton = ({ aside }: { aside: boolean }) => {
  return (
    <div className="container h-max w-full max-w-3xl flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md px-4 pt-2">
      <div className="post-container animate-pulse relative h-full w-full flex-col items-center justify-center pb-2">
        <div className="top w-full flex items-center justify-center pb-1 border-b border-gray-300 dark:border-gray-600">
          <div className="left-column h-full w-max flex justify-center">
            <div className="avatar-container w-11 h-11 bg-gray-300 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-500"></div>
          </div>
          <div className="right-column  h-full w-full flex flex-col items-center justify-center">
            <div className="username-title-container h-14 w-full flex flex-col items-start justify-evenly pl-1">
              <div className="username-date h-6 w-full flex items-start justify-between rounded">
                <div className="h-full w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-2/3 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
        <div className={`${aside ? "h-32" : "h-48"} w-full flex items-center justify-center py-2`}>
          <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="bottom h-8 w-full flex items-center justify-end rounded-b">
          <div className="h-5 w-1/2 flex items-center justify-end space-x-4 rounded">
            <div className="h-full w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-full w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserCardSkeleton = ({ mod }: { mod: boolean }) => {
  return (
    <div className="w-[16rem] xl:w-[18rem] h-24 lg:flex flex-col items-center justify-start space-y-2 animate-pulse px-3 py-2">
      <div className="w-full flex items-center justify-start space-x-2 hover:underline hover:font-bold">
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
    <div
      style={{ height: "calc(100vh - 7rem)" }}
      className="w-full flex flex-col items-center justify-start rounded md:mt-8  bg-white dark:bg-gray-900 relative"
    >
      <div className="h-[17rem] w-full">
        <div className="animate-pulse banner h-48 relative bg-gray-300 dark:bg-gray-700 w-full flex flex-col rounded-tl rounded-tr items-center justify-start space-y-2 pb-24 md:pb-12">
          <div className="w-36 h-36 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-900 absolute left-4 -bottom-20"></div>
        </div>
      </div>
      <span className="btn-follow h-6 w-max max-w-[12rem] min-w-[7.5rem] absolute right-4 top-0 translate-y-[12.8rem] rounded-full bg-gray-200 dark:bg-gray-700"></span>
      <div className="info w-full h-24 pl-6 flex flex-col items-start justify-center space-y-2">
        <span className="h-6 w-max max-w-[60%] min-w-[50%] rounded bg-gray-200 dark:bg-gray-700"></span>
        <span className="h-3 w-max max-w-[12rem] min-w-[7.5rem] rounded bg-gray-200 dark:bg-gray-700"></span>
        <span className="h-3 w-max max-w-[12rem] min-w-[7.5rem] rounded bg-gray-200 dark:bg-gray-700"></span>
      </div>
      <div className="animate-pulse w-full h-max flex items-center justify-center space-x-6 pt-10 px-4">
        <h2 className="h-6 w-1/2 md:max-w-[16rem] bg-gray-300 dark:bg-gray-700 rounded"></h2>
        <h2 className="h-6 w-1/2 md:max-w-[16rem] bg-gray-300 dark:bg-gray-700 rounded"></h2>
      </div>
    </div>
  );
};

const Skeleton = ({ element, number, mod, aside }: SkeletonProps) => {
  let arrayOfSkeletons = new Array(number).fill(number, 0, number);
  return (
    <>
      {element === "post"
        ? arrayOfSkeletons.map((_, i) => <PostSkeleton key={i + 1} aside={aside} />)
        : element === "user"
        ? arrayOfSkeletons.map((_, i) => <UserCardSkeleton key={i} mod={mod} />)
        : element === "profile" && arrayOfSkeletons.map((_, i) => <ProfileSkeleton key={i + 1} />)}
    </>
  );
};

export default Skeleton;

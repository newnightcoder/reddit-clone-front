import { useSelector } from "react-redux";
import { picPlaceholder } from "../assets";
import BtnFollow from "./BtnFollow";
import { FollowerCardProps } from "./react-app-env";

const FollowerCard = ({ user: { userId, username, picUrl }, followersCount, followersCountSetter }: FollowerCardProps) => {
  const { id } = useSelector((state) => state.user);

  return (
    <div className="w-full max-w-[600px] py-2 px-4 flex items-center justify-evenly space-x-1 border-b transition-color duration-500 border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-sm text-gray-800 dark:text-gray-200">
      <div className=" w-full flex items-center justify-start">
        <div
          className="h-12 w-12 rounded-full border"
          style={{ background: `url(${picUrl ? picUrl : picPlaceholder}) no-repeat center/cover` }}
        ></div>
        <span className="w-[calc(100%-4rem)] capitalize text-sm px-0.5">
          <span className="text-xs">@</span>
          {username}
        </span>
      </div>
      <div className="w-max">
        {userId !== id ? (
          <BtnFollow userId={userId!} count={followersCount} countSetter={followersCountSetter} container={"followerCard"} />
        ) : (
          <button
            className={`flex items-center justify-center space-x-1 text-md bg-blue-500 text-white text-sm px-4 py-1 rounded-full hover:drop-shadow whitespace-nowrap`}
          >
            Go to my profile
          </button>
        )}
      </div>
    </div>
  );
};

export default FollowerCard;

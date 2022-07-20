import { useSelector } from "react-redux";
import { picPlaceholder } from "../assets";
import BtnFollow from "./BtnFollow";
import { FollowerCardProps } from "./react-app-env";

const FollowerCard = ({ user: { userId, username, picUrl }, followersCount, followersCountSetter }: FollowerCardProps) => {
  const { id } = useSelector((state) => state.user);
  return (
    <div className="w-full max-w-[600px] py-2 px-8 flex items-center justify-start space-x-1 border-b transition-color duration-500 border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-sm text-gray-800 dark:text-gray-200">
      <div
        className="h-7 w-7 rounded-full"
        style={{ background: `url(${picUrl ? picUrl : picPlaceholder}) no-repeat center/cover` }}
      ></div>
      <span className="capitalize text-base w-full">
        <span className="text-xs">@</span>
        {username}
      </span>
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
  );
};

export default FollowerCard;

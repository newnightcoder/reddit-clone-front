import { useDispatch } from "react-redux";
import { picPlaceholder } from "../assets";
import { useLanguage } from "../utils/hooks";
import BtnFollow from "./BtnFollow";
import { FollowerCardProps } from "./react-app-env";

const FollowerCard = ({ user: { id: profileId, username, picUrl }, followersCount, followersCountSetter }: FollowerCardProps) => {
  const userLanguage = useLanguage();
  const dispatch = useDispatch();

  return (
    <div className="w-full py-2 px-8 flex items-center justify-start space-x-1 border-b transition-color duration-500 border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-sm text-gray-800 dark:text-gray-200">
      <div
        className="h-7 w-7 rounded-full"
        style={{ background: `url(${picUrl ? picUrl : picPlaceholder}) no-repeat center/cover` }}
      ></div>
      <span className="capitalize text-base w-[calc(100%-8rem)]">
        <span className="text-xs">@</span>
        {username}
      </span>
      <BtnFollow profileId={profileId!} count={followersCount} countSetter={followersCountSetter} container={"follower"} />
    </div>
  );
};

export default FollowerCard;

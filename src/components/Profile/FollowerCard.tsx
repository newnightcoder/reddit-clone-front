import { useSelector } from "react-redux";
import { picPlaceholder } from "../../assets";
import useHandleLink from "../../utils/hooks/useHandleLink";
import { FollowerCardProps } from "../react-app-env";
import BtnFollow from "./BtnFollow";

const FollowerCard = ({ user, followersCount, followersCountSetter }: FollowerCardProps) => {
  const { userId, username, picUrl } = user;
  const { id: myId, username: myName } = useSelector((state) => state.user);
  const handleLink = useHandleLink();
  return (
    <div className="w-full max-w-[600px] py-4 px-4 flex items-center justify-between space-x-1 border-b transition-color duration-500 border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-sm text-gray-800 dark:text-gray-200">
      <button
        className="w-max flex items-center justify-start outline-none"
        onClick={() => handleLink("post-profile", userId === myId ? myId : userId, username === myName ? myName : username)}
      >
        <div
          className="h-12 w-12 rounded-full border"
          style={{ background: `url(${picUrl ? picUrl : picPlaceholder}) no-repeat center/cover` }}
        ></div>
        <span className="w-[calc(100%-4rem)] capitalize text-sm px-0.5">
          <span className="text-xs">@</span>
          {username}
        </span>
      </button>
      <div className="w-max">
        {userId !== myId ? (
          <BtnFollow
            user={user!}
            userId={userId}
            count={followersCount}
            countSetter={followersCountSetter}
            container={"followerCard"}
          />
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

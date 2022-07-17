import { ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../utils/hooks";
import { datasetTypes } from "./dataForToggleDiv";
import { FollowersProps, IDataSet } from "./react-app-env";
import ToggleDiv from "./ToggleDiv";

const Followers = ({ bool, followersOpen, toggleFollowers, userId, setter }: FollowersProps) => {
  const {
    id: myId,
    followers,
    following,
    currentProfileVisit: { id: profileId, followers: userFollowers, following: userFollowing },
  } = useSelector((state) => state?.user);
  const userLanguage = useLanguage();

  const dataset1: IDataSet = {
    name: datasetTypes.follower,
    data: myId === profileId ? followers : userFollowers,
  };
  const dataset2: IDataSet = {
    name: datasetTypes.follower,
    data: myId === profileId ? following : userFollowing,
  };

  useEffect(() => {
    console.log("userId", userId, "myId", myId);
  }, []);

  return (
    <div
      className={`${
        followersOpen ? "translate-x-0" : "translate-x-full"
      } transition duration-300 absolute top-0 inset-x-0 min-h-[calc(100vh-8rem)] flex flex-col items-center justify-start rounded z-20 overflow-y-auto bg-white`}
    >
      <div className="h-24 w-full flex items-center justify-start pl-2 md:pl-7">
        <button className="w-max flex items-center justify-center space-x-1" onClick={toggleFollowers}>
          <ChevronDoubleLeftIcon className="h-4" />
          <span className="uppercase text-sm underline font-bold">{userLanguage.profile.back}</span>
        </button>
      </div>
      <ToggleDiv bool={bool} setter={setter} dataset1={dataset1} dataset2={dataset2} container={"followers"} />
    </div>
  );
};

export default Followers;

import { ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import { ForwardedRef, forwardRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../utils/hooks";
import { datasetTypes } from "./dataForToggleDiv";
import { FollowersProps, IDataSet } from "./react-app-env";
import ToggleDiv from "./ToggleDiv";

const Followers = (props: FollowersProps, ref: ForwardedRef<HTMLDivElement>) => {
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
    console.log("userId", props.userId, "myId", myId);
  }, []);

  return (
    <div
      ref={ref}
      className={`${
        props.followersOpen ? "translate-x-0" : "translate-x-full"
      } w-full min-h-[calc(100vh-7rem)] transition duration-300 absolute top-0 mx-auto flex flex-col items-center justify-start rounded z-20 bg-white dark:bg-gray-900`}
    >
      <div className="h-24 w-full flex items-center justify-start pl-2 md:pl-7">
        <button className="w-max flex items-center justify-center space-x-1" onClick={props.toggleFollowers}>
          <ChevronDoubleLeftIcon className="h-4" />
          <span className="uppercase text-sm underline font-bold">{userLanguage.profile.back}</span>
        </button>
      </div>
      <ToggleDiv
        bool={props.bool}
        setter={props.setter}
        followersCountSetter={props.followersCountSetter}
        dataset1={dataset1}
        dataset2={dataset2}
        container={"followerCard"}
      />
    </div>
  );
};

export default forwardRef<HTMLDivElement, FollowersProps>(Followers);

import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../utils/hooks";
import { FollowersToggleProps } from "./react-app-env";

const FollowersToggle = ({ setIsFollowersClicked, toggleFollowers, user, updatedFollowersCount }: FollowersToggleProps) => {
  const {
    id,
    followingCount,
    followersCount,
    currentProfileVisit: { id: profileId },
  } = useSelector((state) => state.user);
  const userLanguage = useLanguage();
  const formatNumber = useCallback((number: number) => {
    const thousand = 1000;
    const million = 1000000;
    if (number >= million) return `${number / million}M`;
    if (number >= thousand) return `${number / thousand}K`;
    return number;
  }, []);

  return (
    <div className="w-full flex items-center justify-start space-x-2 text-sm translate-x-40 pl-2 mb-4">
      <button
        className="outline-none"
        onClick={() => {
          setIsFollowersClicked(false);
          toggleFollowers();
        }}
      >
        <span className="font-bold font-sans">{profileId === id ? followingCount : user?.followingCount}</span>
        {userLanguage.profile.userFollowing}
      </button>
      <button
        className="outline-none"
        onClick={() => {
          setIsFollowersClicked(true);
          toggleFollowers();
        }}
      >
        <span className="font-bold font-sans">
          {profileId === id ? formatNumber(followersCount) : formatNumber(updatedFollowersCount)}
        </span>
        {userLanguage.profile.userFollowers}
      </button>
    </div>
  );
};
export default FollowersToggle;

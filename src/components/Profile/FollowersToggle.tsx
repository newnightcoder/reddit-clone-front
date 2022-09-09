import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/helpers";
import { useLanguage } from "../../utils/hooks";
import { FollowersToggleProps } from "../react-app-env";

const FollowersToggle = ({ toggleFollowers, user, updatedFollowersCount }: FollowersToggleProps) => {
  const {
    id,
    followingCount,
    followersCount,
    currentProfileVisit: { id: profileId },
  } = useSelector((state) => state.user);
  const userLanguage = useLanguage();

  return (
    <div className="w-full flex items-center justify-start space-x-2 text-sm pl-1">
      <button className="outline-none" onClick={toggleFollowers}>
        <span className="font-bold font-sans">{profileId === id ? followingCount : user?.followingCount}</span>
        <span> {userLanguage.profile.userFollowing}</span>
      </button>
      <button className="outline-none" onClick={toggleFollowers}>
        <span className="font-bold font-sans">
          {profileId === id ? formatNumber(followersCount) : formatNumber(updatedFollowersCount)}
        </span>
        <span> {userLanguage.profile.userFollowers}</span>
      </button>
    </div>
  );
};
export default FollowersToggle;

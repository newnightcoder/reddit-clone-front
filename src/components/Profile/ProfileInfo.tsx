import { useSelector } from "react-redux";
import { logo_mobile_blue } from "../../assets";
import { formatTimestamp } from "../../utils/helpers/formatTime";
import { useLanguage } from "../../utils/hooks";
import { ProfileInfoProps } from "../react-app-env";
import FollowersToggle from "./FollowersToggle";

const ProfileInfo = ({ user, toggleFollowers, updatedFollowersCount }: ProfileInfoProps) => {
  const {
    id,
    username,
    currentProfileVisit: { id: profileId },
    language,
    creationDate,
  } = useSelector((state) => state.user);
  const userLanguage = useLanguage();

  return (
    <div className="username-member relative h-24 w-full flex flex-col items-start justify-start mb-4 pl-6">
      <span className="h-max w-full py-1 pr-4 text-left text-xl font-bold capitalize truncate">
        {id === profileId && username
          ? username
          : id === profileId && !username
          ? "Noname"
          : user.username
          ? user.username
          : "Noname"}
      </span>

      <div className="w-full italic text-xs md:text-sm flex items-center justify-start transform py-1">
        <img src={logo_mobile_blue} className="h-5 -translate-y-1 " alt="forum logo" />
        <span>{userLanguage.menu.member}&nbsp;</span>
        <span>
          {user?.creationDate
            ? formatTimestamp(user?.creationDate, "", language)
            : creationDate?.length !== 0
            ? formatTimestamp(creationDate, "", language)
            : null}
        </span>
      </div>
      <FollowersToggle user={user} toggleFollowers={toggleFollowers} updatedFollowersCount={updatedFollowersCount!} />
    </div>
  );
};

export default ProfileInfo;

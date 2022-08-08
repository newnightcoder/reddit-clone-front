import { useSelector } from "react-redux";
import { logo_mobile_blue } from "../assets";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useLanguage } from "../utils/hooks";
import FollowersToggle from "./FollowersToggle";
import { ProfileInfoProps } from "./react-app-env";

const ProfileInfo = ({
  user,
  // btnFollowWidth,
  setIsFollowersClicked,
  toggleFollowers,
  updatedFollowersCount,
}: ProfileInfoProps) => {
  const {
    id,
    username,
    currentProfileVisit: { id: profileId },
    language,
    creationDate,
  } = useSelector((state) => state.user);
  const userLanguage = useLanguage();

  return (
    <div className="md:pl-6 username-member relative h-24 w-full self-start transform flex flex-col items-start justify-start mb-4">
      <span
        // style={{ width: `calc(100% - 11rem - ${btnFollowWidth}px)` }}
        className="h-max w-full py-1 pl-6 flex items-center justify-start text-xl font-bold capitalize overflow-x-hidden overflow-ellipsis whitespace-nowrap pl-1 pr-4"
      >
        {id === profileId && username
          ? username
          : id === profileId && !username
          ? "Noname"
          : user.username
          ? user.username
          : "Noname"}
      </span>

      <div className="italic text-xs md:text-sm flex items-center justify-center transform py-1 pl-6">
        <img src={logo_mobile_blue} className="h-5 -translate-y-1 " alt="forum logo" />
        <span>{userLanguage.menu.member}</span>
        <span>
          {user?.creationDate
            ? formatTimestamp(user?.creationDate, "", language)
            : creationDate?.length !== 0
            ? formatTimestamp(creationDate, "", language)
            : null}
        </span>
      </div>
      <FollowersToggle
        user={user}
        setIsFollowersClicked={setIsFollowersClicked}
        toggleFollowers={toggleFollowers}
        updatedFollowersCount={updatedFollowersCount!}
      />
    </div>
  );
};

export default ProfileInfo;

import { useSelector } from "react-redux";
import { logo_mobile_blue } from "../assets";
import { IUser } from "../store/types";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useLanguage } from "../utils/hooks";

const ProfileInfo = ({ user, btnFollowWidth }: { user: IUser; btnFollowWidth: number | null }) => {
  const {
    id,
    username,
    currentProfileVisit: { id: profileId },
    language,
    creationDate,
  } = useSelector((state) => state.user);
  const userLanguage = useLanguage();

  return (
    <div className="username-member mb-2  relative h-max w-full self-start transform flex flex-col items-start justify-start">
      <span
        style={{ width: `calc(100% - 11rem - ${btnFollowWidth}px)` }}
        className="translate-x-40 text-xl font-bold capitalize overflow-x-hidden overflow-ellipsis pl-1 pr-4"
      >
        {id === profileId && username
          ? username
          : id === profileId && !username
          ? "Noname"
          : user.username
          ? user.username
          : "Noname"}
      </span>
      <div className="italic text-sm flex items-center justify-center space-x-1 transform translate-x-40 mt-1">
        <img src={logo_mobile_blue} className="h-6" alt="forum logo" />
        <span>{userLanguage.menu.member}</span>
        <span>
          {user?.creationDate
            ? formatTimestamp(user?.creationDate, "", language)
            : creationDate?.length !== 0
            ? formatTimestamp(creationDate, "", language)
            : null}
        </span>
      </div>
    </div>
  );
};

export default ProfileInfo;

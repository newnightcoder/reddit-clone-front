import { useSelector } from "react-redux";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useHandleLink, useLanguage } from "../utils/hooks";

const UserCard = ({ user, mod }) => {
  const { id: userId, username, picUrl, creationDate } = user;
  const handleLink = useHandleLink();
  const userLanguage = useLanguage();
  const { id: myId, username: myName, language } = useSelector((state) => state?.user);

  return (
    <div className="w-full py-2 px-3 border-b transition-color duration-500 border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-sm text-gray-800 dark:text-gray-200">
      <button
        className="flex items-center justify-start space-x-2 hover:underline hover:font-bold p-2"
        onClick={() => {
          mod
            ? handleLink("mods", userId === myId ? myId : userId, username === myName ? myName : username)
            : handleLink("new-members", userId === myId ? myId : userId, username === myName ? myName : username);
        }}
      >
        <div className="h-14 w-14 p-px flex items-center justify-center rounded-full border-2 border-blue-400 hover:border-red-400 transition duration-300">
          <div
            className="inline w-full h-full rounded-full"
            style={{ background: `url(${picUrl ? picUrl : picPlaceholder}) no-repeat center/cover` }}
          ></div>
        </div>
        <span className="capitalize max-w-[20ch] overflow-x-hidden overflow-ellipsis pr-1">{username ? username : "Noname"}</span>
      </button>
      {!mod && (
        <span className="w-full flex justify-center text-xs italic">
          {userLanguage.profile.member} {formatTimestamp(creationDate, "card", language)}
        </span>
      )}
    </div>
  );
};

export default UserCard;

import React from "react";
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
        className="flex gap-2 items-center justify-start hover:underline hover:font-bold"
        onClick={() => {
          mod
            ? handleLink("mods", userId === myId ? myId : userId, username === myName ? myName : username)
            : handleLink("new-members", userId === myId ? myId : userId, username === myName ? myName : username);
        }}
      >
        <img
          src={picUrl ? picUrl : picPlaceholder}
          alt="avatar"
          className="h-14 w-14 rounded-full border-2 border-blue-400 p-1 hover:border-red-400 transition duration-300"
        />
        <span className="capitalize max-w-[20ch] overflow-x-hidden overflow-ellipsis pr-1">{username ? username : "Noname"}</span>
      </button>
      {!mod && (
        <span className="w-full flex justify-center text-xs italic">
          {userLanguage.navbarDesktop.member} {formatTimestamp(creationDate, "card", language)}
        </span>
      )}
    </div>
  );
};

export default UserCard;

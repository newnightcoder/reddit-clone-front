import React from "react";
import { useDispatch } from "react-redux";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { getUserProfile } from "../store/actions/user.action";
import { formatTimestamp } from "../utils/formatTime";
import history from "../utils/history";

const UserCard = ({ user, mod }) => {
  const { id, username, picUrl, creationDate } = user;
  const dispatch = useDispatch();

  const toProfilePage = () => {
    dispatch(getUserProfile(id));
    setTimeout(() => {
      history.push(`/profile/${username}`);
    }, 100);
  };
  return (
    <div className="w-full py-2 px-3 border-b border-gray-200 bg-white text-sm text-gray-800">
      <button className="flex gap-2 items-center justify-start hover:underline hover:font-bold" onClick={toProfilePage}>
        <img
          src={picUrl ? picUrl : picPlaceholder}
          className="h-14 w-14 rounded-full border-2 border-blue-400 p-1 hover:border-red-400 transition duration-300"
        />
        <span className="capitalize">{username}</span>
      </button>
      {!mod && <span className="w-full flex justify-center text-xs italic">Depuis {formatTimestamp(creationDate, "card")}</span>}
    </div>
  );
};

export default UserCard;
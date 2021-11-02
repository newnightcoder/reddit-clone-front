import {
  FlagIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/solid";
import React from "react";
import { useSelector } from "react-redux";
import history from "../utils/history";

const Options = ({ userId, postId, toggleOptions, toggleDeleteModal }) => {
  const user = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);

  return (
    <div className="flex flex-col items-start justify-center absolute right-0 bottom-0 bg-gray-800 text-xs text-gray-300 rounded-tl pl-2 pr-6 py-1">
      <button
        className="absolute top-1 right-1 rounded-full border border-white flex items-center justify-center"
        onClick={toggleOptions}
      >
        <XIcon className="h-3 text-white " />
      </button>
      {user !== userId && (
        <button className="h-5 flex gap-0.5 items-center justify-center hover:text-white hover:underline">
          <FlagIcon className="text-gray-300 hover:text-white h-3" /> signaler
        </button>
      )}
      {user === userId && (
        <button
          className="h-5 flex gap-0.5 items-center justify-center hover:text-white hover:underline"
          onClick={() =>
            setTimeout(() => {
              history.push({ pathname: "/edit", state: postId });
            }, 250)
          }
        >
          <PencilIcon className="text-gray-300 hover:text-white h-3" />
          modifier
        </button>
      )}
      {(user === userId || role === "admin") && (
        <button
          className="h-5 flex gap-0.5 items-center justify-center hover:text-white hover:underline"
          onClick={toggleDeleteModal}
        >
          <TrashIcon className="text-gray-300 hover:text-white h-3" />
          supprimer
        </button>
      )}

      <button className="h-5 flex gap-0.5 items-center justify-center hover:text-white hover:underline">
        <ShareIcon className="text-gray-300 hover:text-white h-3" />
        partager
      </button>
    </div>
  );
};

export default Options;

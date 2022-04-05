import { FlagIcon, PencilIcon, ShareIcon, TrashIcon, XIcon } from "@heroicons/react/solid";
import React from "react";
import { useSelector } from "react-redux";
import { history } from "../utils/helpers";

const Options = ({
  postUserId,
  postId,
  commentUserId,
  commentId,
  replyUserId,
  replyId,
  toggleOptions,
  toggleDeleteModal,
  optionsOpen,
}) => {
  const { id: user, role } = useSelector((state) => state?.user);

  return (
    <div
      className="h-max w-1/2 flex flex-col items-center justify-center space-y-2 absolute right-0 bottom-0 bg-gray-800 text-sm transition-transform origin-bottom-right	ease-in-out duration-100 text-gray-300 rounded-tl px-2 py-4"
      style={{ transform: optionsOpen ? "scale(1)" : "scale(0)" }}
    >
      <button className="absolute top-1 right-1 flex items-center justify-center" onClick={toggleOptions}>
        <XIcon className="h-4 text-white" />
      </button>

      {((postUserId !== undefined && user === postUserId) ||
        (commentUserId !== undefined && user === commentUserId) ||
        (replyUserId !== undefined && user === replyUserId)) && (
        <button
          className="h-max w-32 border border-gray-500 rounded-full px-2 py-px flex items-center justify-center space-x-2 hover:text-white hover:underline hover:font-bold group"
          onClick={() =>
            setTimeout(() => {
              history.push({
                pathname: "/edit",
                state: {
                  postId: postUserId !== undefined && postId,
                  commentId: commentUserId !== undefined && commentId,
                  replyId: replyUserId !== undefined && replyId,
                },
              });
            }, 250)
          }
        >
          <PencilIcon className="h-4 text-gray-300 group-hover:text-white" />
          <span>Modifier</span>
        </button>
      )}
      <button className="h-max w-32 border border-gray-500 rounded-full px-2 py-px flex items-center justify-center space-x-2 hover:text-white hover:underline hover:font-bold group">
        <ShareIcon className="h-4 text-gray-300 group-hover:text-white" />
        <span>Partager</span>
      </button>

      {((postUserId !== undefined && user !== postUserId) ||
        (commentUserId !== undefined && user !== commentUserId) ||
        (replyUserId !== undefined && user !== replyUserId)) && (
        <button className="h-max w-32 border border-gray-500 rounded-full px-2 py-px flex items-center justify-center space-x-2 hover:text-white hover:underline hover:font-bold group">
          <FlagIcon className="h-4 text-gray-300 group-hover:text-white" /> <span>Signaler</span>
        </button>
      )}
      {((postUserId !== undefined && user === postUserId) ||
        (commentUserId !== undefined && user === commentUserId) ||
        (replyUserId !== undefined && user === replyUserId) ||
        role === "admin") && (
        <button
          className="h-max w-32 border border-gray-500 rounded-full px-2 py-px flex items-center justify-center space-x-2 hover:text-white hover:underline hover:font-bold group"
          onClick={toggleDeleteModal}
        >
          <TrashIcon className="h-4 text-gray-300 group-hover:text-white" />
          <span>Supprimer</span>
        </button>
      )}
    </div>
  );
};

export default Options;

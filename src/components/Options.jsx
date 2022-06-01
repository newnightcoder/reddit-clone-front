import { FlagIcon, PencilIcon, ShareIcon, TrashIcon, XIcon } from "@heroicons/react/solid";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditId, toggleEditModal } from "../store/actions/posts.action";
import { history } from "../utils/helpers";
import { useLanguage } from "../utils/hooks";

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
  const dispatch = useDispatch();
  const userLanguage = useLanguage();

  const dispatchEditInfo = useCallback(() => {
    dispatch(
      setEditId(
        postId !== undefined
          ? { id: postId, type: "post" }
          : commentId !== undefined
          ? { id: commentId, type: "comment" }
          : replyId !== undefined && { id: replyId, type: "reply" }
      )
    );
  }, [dispatch, setEditId, postId, commentId, replyId]);

  return (
    <div
      className="h-full w-1/2 flex flex-col items-center justify-center space-y-2 absolute right-0 bottom-0 bg-gray-800 text-sm transition origin-bottom-right	ease-in-out duration-300 text-gray-300 rounded-tl rounded-tr rounded-br px-2 py-4"
      style={{ transform: optionsOpen ? "scale(1)" : "scale(0)", opacity: optionsOpen ? 1 : 0 }}
    >
      <button className="absolute top-1 right-1 flex items-center justify-center" onClick={toggleOptions}>
        <XIcon className="h-4 text-white" />
      </button>

      {((postUserId !== undefined && user === postUserId) ||
        (commentUserId !== undefined && user === commentUserId) ||
        (replyUserId !== undefined && user === replyUserId)) && (
        <button
          className="h-max w-11/12 border border-gray-500 rounded-full px-2 py-px flex items-center justify-center space-x-2 hover:text-white hover:underline hover:font-bold group"
          onClick={() => {
            dispatchEditInfo();
            if (postId === undefined) {
              dispatch(toggleEditModal());
              toggleOptions();
            } else history.push("/edit");
          }}
        >
          <PencilIcon className="h-4 text-gray-300 group-hover:text-white" />
          <span>{userLanguage.postOptions.modify}</span>
        </button>
      )}
      <button className="h-max w-11/12 border border-gray-500 rounded-full px-2 py-px flex items-center justify-center space-x-2 hover:text-white hover:underline hover:font-bold group">
        <ShareIcon className="h-4 text-gray-300 group-hover:text-white" />
        <span>{userLanguage.postOptions.share}</span>
      </button>

      {((postUserId !== undefined && user !== postUserId) ||
        (commentUserId !== undefined && user !== commentUserId) ||
        (replyUserId !== undefined && user !== replyUserId)) && (
        <button className="h-max w-11/12 border border-gray-500 rounded-full px-2 py-px flex items-center justify-center space-x-2 hover:text-white hover:underline hover:font-bold group">
          <FlagIcon className="h-4 text-gray-300 group-hover:text-white" /> <span>{userLanguage.postOptions.report}</span>
        </button>
      )}
      {((postUserId !== undefined && user === postUserId) ||
        (commentUserId !== undefined && user === commentUserId) ||
        (replyUserId !== undefined && user === replyUserId) ||
        role === "admin") && (
        <button
          className="h-max w-11/12 border border-gray-500 rounded-full px-2 py-px flex items-center justify-center space-x-2 hover:text-white hover:underline hover:font-bold group"
          onClick={toggleDeleteModal}
        >
          <TrashIcon className="h-4 text-gray-300 group-hover:text-white" />
          <span>{userLanguage.postOptions.delete}</span>
        </button>
      )}
    </div>
  );
};

export default Options;

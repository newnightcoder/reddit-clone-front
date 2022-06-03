import React from "react";
import { ChatRight, HandThumbsUp, HandThumbsUpFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useHandleLink, useLanguage } from "../utils/hooks";

const PostFooter = ({ toggleOptions, toCommentPage, likesNumber, commentsNumber, handleLike, postId, like }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const handleLink = useHandleLink();
  const userLanguage = useLanguage();

  return (
    <div className="bottom h-9 w-full flex items-center justify-end px-2 md:rounded-bl md:rounded-br transition-color duration-500 bg-gray-100 dark:bg-gray-900">
      <div className="icons-container h-full w-max flex items-center justify-end space-x-4 text-xs text-gray-500 dark:text-gray-300 font-bold md:rounded-bl md:rounded-br">
        <button
          className="outline-none h-full w-max flex items-center justify-center gap-1 transition-color duration-100 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-sm px-2"
          onClick={() => {
            isAuthenticated ? toCommentPage() : handleLink("comment");
          }}
        >
          <ChatRight size={14} className="font-weight-bold" />
          <span className="font-bold">{commentsNumber}</span>{" "}
          <span className="font-bold">{userLanguage.postFooter.comments}</span>
        </button>
        <div className="h-full w-max flex items-center justify-center transition-color duration-100 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer px-2 rounded-sm">
          <button
            className="outline-none transform -translate-y-px"
            onClick={() => {
              isAuthenticated ? handleLike(postId) : handleLink("like");
            }}
          >
            {like ? <HandThumbsUpFill size={14} /> : <HandThumbsUp size={14} className="font-weight-bold" />}
          </button>
          <span className="w-4 text-center">{likesNumber}</span>
        </div>
        <button
          className="h-full w-max flex items-center justify-center gap-1 transition-color duration-100 hover:bg-gray-200 dark:hover:bg-gray-800 px-2 rounded-full"
          onClick={toggleOptions}
        >
          <ThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};

export default PostFooter;

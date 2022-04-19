import { PaperAirplaneIcon } from "@heroicons/react/solid";
import React from "react";
import { Image, Youtube } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useLanguage } from "../utils/hooks";

const CommentForm = ({ handleCommentSubmit, handleChange }) => {
  const { username } = useSelector((state) => state.user);
  const userLanguage = useLanguage();
  return (
    <form className="h-max w-full flex flex-col items-center justify-center" method="post" onSubmit={handleCommentSubmit}>
      <span className="w-full text-left text-sm py-1 pl-1">
        Comment as <span className="text-blue-400 underline capitalize">{username}</span>
      </span>
      <div className="h-max w-full flex flex-col items-center justify-start border border-gray-300 hover:border-gray-500 rounded">
        <div className="editor-container w-full overflow-y-auto h-32 bg-gray-100 hover:bg-white active:bg-white focus:bg-white md:rounded-t">
          <textarea
            className="w-full h-full p-3 focus:outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white"
            onChange={handleChange}
            placeholder={userLanguage.commentPage.commentForm.placeholder}
          />
        </div>
        <div className="h-12 w-full flex items-center justify-between md:rounded-b bg-gray-200 pr-2">
          <div className="w-2/3 h-full flex items-center justify-start">
            <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
              <Image />
            </button>
            <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
              <Youtube />
            </button>
          </div>
          <div className="w-full flex items-center justify-end gap-1">
            <button
              className="h-8 flex items-center justify-center gap-1 text-white bg-gray-500 rounded-full disabled:opacity-50 px-4"
              disabled={false}
              type="submit"
            >
              <span className="text-sm capitalize">{userLanguage.commentPage.commentForm.commentBtn}</span>
              <PaperAirplaneIcon className="h-4 w-4 text-white transform rotate-45 -translate-y-px" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;

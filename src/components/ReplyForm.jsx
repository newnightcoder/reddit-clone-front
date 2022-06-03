import { PaperAirplaneIcon, XIcon } from "@heroicons/react/solid";
import React from "react";
import { useLanguage } from "../utils/hooks";

const ReplyForm = ({ handleReplySubmit, replyOpen, setReplyOpen, replyTextRef, handleChange }) => {
  const userLanguage = useLanguage();

  return (
    <div className={`w-full mb-2 rounded bg-gray-100 dark:bg-gray-600 ${replyOpen ? "inline-block" : "hidden"}`}>
      <form className="h-max w-full flex flex-col items-center justify-center rounded" method="post" onSubmit={handleReplySubmit}>
        <div className="rounded h-max w-full flex flex-col items-center justify-start border border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-200 transition-border-color duration-300">
          <div className="editor-container w-full h-32">
            <textarea
              ref={replyTextRef}
              className="rounded-t w-full h-full p-3 focus:outline-none transition-color duration-300 bg-gray-100 hover:bg-white dark:bg-gray-600 dark:hover:bg-gray-700  active:bg-white focus:bg-white dark:caret-white"
              onChange={handleChange}
              placeholder={userLanguage.commentPage.replyForm.placeholder}
            />
          </div>
          <div className="h-12 w-full flex items-center justify-end bg-gray-100 dark:bg-gray-600 pr-4 rounded-b">
            <div className="w-max flex items-center justify-end space-x-2">
              <button
                className="h-6 w-6 rounded-full flex items-center justify-center text-white transition-color duration-500 text-white bg-gray-500 dark:bg-gray-900"
                onClick={() => setReplyOpen(false)}
              >
                <XIcon className="h-4 w-4 text-white" />
              </button>
              <button
                className="h-6 w-max flex items-center justify-center space-x-1 text-white transition-color duration-500 text-white bg-gray-500 dark:bg-gray-900 rounded-3xl px-3"
                type="submit"
              >
                <span className="text-xs capitalize pl-1">{userLanguage.commentPage.replyForm.replyBtn}</span>
                <PaperAirplaneIcon className="h-4 w-4 text-white transform rotate-45 -translate-y-px" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;

import { PaperAirplaneIcon, XIcon } from "@heroicons/react/solid";
import React from "react";
import { Image, Youtube } from "react-bootstrap-icons";
import { useLanguage } from "../utils/hooks";

const ReplyForm = ({ handleReplySubmit, replyOpen, setReplyOpen, replyTextRef, handleChange }) => {
  const userLanguage = useLanguage();

  return (
    <div className="w-11/12" style={{ display: replyOpen ? "flex" : "none" }}>
      <form
        className="h-max w-full flex flex-col items-center justify-center bg-white mb-2"
        method="post"
        onSubmit={handleReplySubmit}
      >
        <div className="h-max w-full flex flex-col items-center justify-start border border-gray-300 hover:border-gray-500 rounded">
          <div className="editor-container w-full overflow-y-auto h-32  rounded-t">
            <textarea
              ref={replyTextRef}
              className="w-full h-full p-3 focus:outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white"
              onChange={handleChange}
              placeholder={userLanguage.commentPage.replyForm.placeholder}
            />
          </div>
          <div className="h-12 w-full flex items-center justify-between rounded-b bg-gray-200 pr-2">
            <div className="w-1/2 h-full flex items-center justify-center">
              <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                <Image />
              </button>
              <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                <Youtube />
              </button>
            </div>
            <div className="w-max flex items-center justify-end gap-1">
              <button
                className="h-6 w-6 rounded-full flex items-center justify-center text-white bg-gray-500"
                disabled={false}
                onClick={() => setReplyOpen(false)}
              >
                <XIcon className="h-4 w-4 text-white" />
              </button>
              <button
                className="h-6 flex items-center justify-center gap-1 text-white bg-gray-500 rounded-3xl disabled:opacity-50 px-2"
                disabled={false}
                type="submit"
              >
                <span className="text-xs capitalize">{userLanguage.commentPage.replyForm.replyBtn}</span>
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

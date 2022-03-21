import { PaperAirplaneIcon } from "@heroicons/react/solid";
import React from "react";
import { Image, Youtube } from "react-bootstrap-icons";

const CommentForm = ({ handleCommentSubmit, handleChange }) => {
  return (
    <form className="h-max w-full flex flex-col items-center justify-center pt-2" method="post" onSubmit={handleCommentSubmit}>
      <div className="h-max w-full flex flex-col items-center justify-start border border-gray-300 hover:border-gray-500 rounded">
        <div className="editor-container w-full overflow-y-auto h-32 bg-gray-100 hover:bg-white active:bg-white focus:bg-white rounded-t">
          <textarea
            className="w-full h-full p-3 focus:outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white"
            onChange={handleChange}
            placeholder="Votre commentaire..."
          />
        </div>
        <div className="h-12 w-full flex items-center justify-between rounded-b bg-gray-200 pr-2">
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
              className="h-8 flex items-center justify-center gap-1 text-white bg-gray-500 rounded-3xl disabled:opacity-50 px-4"
              disabled={false}
              type="submit"
            >
              <span className="text-sm capitalize">commenter</span>
              <PaperAirplaneIcon className="h-4 w-4 text-white transform rotate-45 -translate-y-px" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;

import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useError, useLanguage } from "../../utils/hooks";
import { CommentFormProps } from "../react-app-env";

const CommentForm = ({ handleCommentSubmit, handleChange, commentTextRef }: CommentFormProps) => {
  const { username } = useSelector((state) => state.user);
  const { error: errorType } = useSelector((state) => state.posts);
  const userLanguage = useLanguage();
  const error = useError();

  return (
    <form
      className="h-max relative w-full flex flex-col items-center justify-center space-y-1 rounded"
      method="post"
      onSubmit={handleCommentSubmit}
    >
      <div
        className="error md:absolute md:top-0 h-max w-full md:w-max mx-auto items-center justify-center bg-black dark:bg-white text-white dark:text-black text-center text-sm px-3 py-2 rounded mb-4  whitespace-pre"
        style={{ display: error && errorType === "emptyComment" ? "flex" : "none" }}
      >
        {error}
      </div>
      <span className="w-full text-gray-900 dark:text-gray-100 text-left text-sm py-1 pl-1">
        {userLanguage.commentPage.commentForm.commentAs}&nbsp;
        <span className="text-blue-400 underline capitalize">
          <Link to={`/profile/${username}`}>{username}</Link>
        </span>
      </span>
      <div className="h-max w-full flex flex-col items-center bg-gray-100 dark:bg-gray-600 justify-start border border-gray-400 dark:border-gray-700 hover:border-gray-500 dark:hover:border-gray-200 transition-border-color duration-300 rounded">
        <div className="editor-container w-full h-32 bg-gray-100 dark:bg-gray-600 hover:bg-white active:bg-white focus:bg-white md:rounded-t">
          <textarea
            id="commentInput"
            ref={commentTextRef}
            className="w-full h-full p-3 focus:outline-none transition-color duration-300 text-gray-900 dark:text-gray-100 bg-gray-100 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-900 dark:caret-white rounded"
            onChange={handleChange}
            placeholder={userLanguage.commentPage.commentForm.placeholder}
          />
        </div>
        <div className="h-12  w-full flex items-center justify-end md:rounded-b bg-gray-100 dark:bg-gray-700 pr-4">
          <button
            className="h-8 flex items-center justify-center space-x-1 transition-color duration-500 text-white bg-gray-500 dark:bg-gray-900 hover:bg-blue-500 dark:hover:bg-gray-800 rounded-full px-4"
            disabled={false}
            type="submit"
          >
            <span className="text-sm capitalize">{userLanguage.commentPage.commentForm.commentBtn}</span>
            <PaperAirplaneIcon className="h-4 w-4 text-white transform rotate-45 -translate-y-px" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;

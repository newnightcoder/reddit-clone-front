import { ChatRight, HandThumbsUp, HandThumbsUpFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/helpers";
import { useHandleLink, useLanguage } from "../../utils/hooks";
import { PostFooterProps } from "../react-app-env";

const PostFooter = ({
  toggleOptions,
  toCommentPage,
  likesNumber,
  commentsNumber,
  handleLike,
  postId,
  like,
  optionsBtnRef,
}: PostFooterProps) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const handleLink = useHandleLink();
  const userLanguage = useLanguage();

  return (
    <div className="bottom h-9 w-full flex items-center justify-end px-2 pb-2 md:pb-0 md:rounded-bl md:rounded-br transition-color duration-500 bg-white dark:bg-gray-900 md:bg-gray-100 md:dark:bg-[#131316]">
      <div className="icons-container h-full w-max flex items-center justify-end space-x-4 text-xs text-gray-500 dark:text-gray-300 font-bold md:rounded-bl md:rounded-br">
        <button
          className="outline-none h-full w-max flex items-center justify-center space-x-1 transition-color duration-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm px-2"
          onClick={() => {
            isAuthenticated ? toCommentPage() : handleLink("comment");
          }}
        >
          <ChatRight size={14} className="font-weight-bold" />
          <span className="font-bold">{commentsNumber}</span>{" "}
          <span className="font-bold">{userLanguage.postFooter.comments}</span>
        </button>
        <button
          onClick={() => {
            isAuthenticated ? handleLike(postId!) : handleLink("like");
          }}
          className="h-full w-max outline-none flex items-center justify-center space-x-1 transition-color duration-100 hover:bg-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer px-2 rounded-sm"
        >
          {like ? <HandThumbsUpFill size={14} /> : <HandThumbsUp size={14} className="font-weight-bold -translate-y-px" />}
          <span className="w-4 text-left font-bold">{formatNumber(likesNumber)}</span>
        </button>
        <button
          ref={optionsBtnRef}
          id="optionsBtn"
          className="h-full w-max flex items-center justify-center space-x-1 transition-color duration-100 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 rounded-full"
          onClick={toggleOptions}
        >
          <ThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};

export default PostFooter;

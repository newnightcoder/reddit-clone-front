import { PaperAirplaneIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { Image, Link45deg, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router";
import { useLocation } from "react-router-dom";
import { giphyDark } from "../assets";
import { clearTempPostImg, toggleEditModal } from "../store/actions/posts.action";
import { history, isObjectEmpty } from "../utils/helpers";
import { useLanguage, useWindowSize } from "../utils/hooks";
import LinkPreview from "./LinkPreview";

const PostForm = ({
  title,
  handlePostSubmit,
  handleTitleInput,
  toggleImgUploadModal,
  toggleGifModal,
  toggleLinkModal,
  handlePostInput,
  postToEdit,
  postTitle,
  postText,
  editText,
  imgDom,
  setImgDom,
  deletePreview,
  handleEditSubmit,
  handleEditCommentSubmit,
  handleEditTitleInput,
  handleEditText,
}) => {
  const currentPostImgUrl = useSelector((state) => state.posts.currentPost.imgUrl);
  const scrapedPost = useSelector((state) => state.posts.scrapedPost);
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const editPage = pathname === "/edit";
  const commentPage = pathname.includes("comments");

  useEffect(() => {
    if (!commentPage) {
      if (currentPostImgUrl.length !== 0) {
        return setImgDom(
          <img id="postImg" src={currentPostImgUrl} alt="" className="h-max rounded" style={{ maxHeight: "500px" }} />
        );
      } else if (!isObjectEmpty(scrapedPost)) {
        return setImgDom(<LinkPreview />);
      } else return setImgDom(null);
    }
  }, [currentPostImgUrl, postToEdit, scrapedPost]);

  return (
    <form
      className={`${width < 768 && editPage ? "min-h-[calc(100vh-8rem)]" : editPage ? "min-h-[max-content]" : ""} ${
        pathname !== "/edit" ? "h-min" : "h-full"
      } w-full flex flex-col items-center justify-start md:justify-center space-y-4 transition-color duration-500 bg-white dark:bg-gray-900 border dark:border-gray-700 md:rounded pt-4 ${
        editPage ? "pb-24" : "pb-6"
      } md:pt-6 md:pb-6 px-4`}
      method="post"
      onSubmit={editPage ? handleEditSubmit : commentPage ? handleEditCommentSubmit : handlePostSubmit}
    >
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (commentPage) {
              return dispatch(toggleEditModal());
            } else history.push("/feed");
          }}
          className="w-8 h-8 outline-none mb-2 md:mb-0 md:w-max md:h-max self-start flex items-center justify-center md:space-x-2 text-white md:px-4 md:py-2 rounded-full shadow-xl bg-gray-500 dark:bg-gray-600 transition duration-300 hover:bg-black dark:hover:bg-black  hover:shadow-none dark:border dark:border-gray-600"
        >
          <span className="hidden md:inline-block text-xs capitalize">{userLanguage.createPost.cancelBtn}</span> <XLg size={12} />
        </button>
        {currentPostImgUrl || postToEdit?.isPreview === 1 ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              currentPostImgUrl ? dispatch(clearTempPostImg()) : postToEdit?.isPreview === 1 && deletePreview();
            }}
            className="h-8 w-max rounded-full px-2  border whitespace-wrap text-xs text-gray-500 flex items-center justify-end text-right"
          >
            {userLanguage.createPost.deleteImgBtn}
          </button>
        ) : null}
      </div>
      {!commentPage && (
        <input
          className="h-10 w-full px-2 rounded outline-none text-gray-900 dark:text-gray-100 dark:caret-white bg-gray-100 dark:bg-gray-700 hover:bg-white active:bg-white focus:bg-white border border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-200 transition-all duration-200 placeholder-gray-400 dark:placeholder-[#999999]"
          type="text"
          name="Title"
          id="title"
          placeholder={pathname === "/create" ? userLanguage.createPost.titlePlaceholder : null}
          onChange={editPage ? (e) => handleEditTitleInput(e) : (e) => handleTitleInput(e)}
          value={editPage ? postTitle : title}
        />
      )}
      <div className="form-container h-full w-full flex flex-col items-center justify-start space-y-6">
        <div className="h-max w-full border border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-200 transition-border-color duration-300 rounded">
          <div
            style={{ minHeight: "12rem" }}
            className="text-container relative w-full bg-gray-100 dark:bg-gray-700 hover:bg-white active:bg-white focus:bg-white rounded overflow-y-auto pb-6"
          >
            <span
              id="postInput"
              style={{
                minHeight:
                  !isObjectEmpty(scrapedPost) || currentPostImgUrl.length !== 0 || postToEdit?.isPreview === 1
                    ? "min-content"
                    : "12rem",
              }}
              className="w-full inline-block focus:outline-none text-gray-900 dark:text-gray-100 dark:caret-white p-2"
              contentEditable="true"
              suppressContentEditableWarning={true}
              placeholder={userLanguage.createPost.textPlaceholder}
              onBlur={editPage || commentPage ? handleEditText : handlePostInput}
            >
              {postText ? postText : editText && editText}
            </span>
            <div id="imgContainer" className="px-2 flex items-start justify-center">
              {imgDom}
            </div>
          </div>
        </div>
        <div
          className={`w-full h-max flex items-center ${
            !commentPage ? "justify-between" : "justify-end"
          } px-1 pb-4 overflow-y-auto space-x-6`}
        >
          {!commentPage && (
            <div className="w-max h-full flex items-center justify-start space-x-2">
              <button
                className="w-max text-gray-500 dark:text-gray-100 text-xs rounded-full transition-color duration-300 border border-gray-200 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-100 px-4 py-2 bg-transparent ouline-none flex items-center justify-start space-x-1"
                onClick={(e) => toggleImgUploadModal(e)}
              >
                <Image size={16} className="text-gray-900 dark:text-gray-100" />
                <span className="hidden md:inline-block text-sm">{userLanguage.createPost.imgBtn}</span>
              </button>
              <button
                className="w-max  text-gray-500 dark:text-gray-100 text-xs rounded-full transition-color duration-300 border border-gray-200 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-100 px-4 py-2 bg-transparent ouline-none flex items-center justify-start space-x-1"
                onClick={(e) => toggleGifModal(e)}
              >
                <img src={giphyDark} width="25" alt="giphy logo" />{" "}
                <span className="hidden md:inline-block text-sm">{userLanguage.createPost.gifBtn}</span>
              </button>
              <button
                className="w-max  text-gray-500 dark:text-gray-100 text-xs rounded-full transition-color duration-300 border border-gray-200 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-100 px-4 py-2 bg-transparent ouline-none flex items-center justify-start"
                onClick={(e) => toggleLinkModal(e)}
              >
                <Link45deg size={20} className="text-gray-900 dark:text-gray-100" />
                <span className="hidden md:inline-block text-sm capitalize">{userLanguage.createPost.linkBtn}</span>
              </button>
            </div>
          )}
          <button
            className="flex items-center justify-center space-x-1 text-white py-3 px-6 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
            type="submit"
          >
            <PaperAirplaneIcon className="h-5 text-white transform rotate-45 -translate-y-0.5" />
            <span className="text-sm uppercase">{userLanguage.createPost.publishBtn}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;

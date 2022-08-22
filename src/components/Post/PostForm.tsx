import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import { Image, Link45deg, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { giphyDark } from "../../assets";
import {
  clearEditIdAction,
  clearTempPostImgAction,
  clearTempPreviewAction,
  toggleEditModalAction,
} from "../../store/actions/posts.action";
import { breakpoint } from "../../utils/breakpoints";
import { fromCDN, history, isObjectEmpty } from "../../utils/helpers";
import { useLanguage, useWindowSize } from "../../utils/hooks";
import { FormProps } from "../react-app-env";
import LinkPreview from "./LinkPreview";

const PreviewLoader = () => {
  return (
    <div className="absolute inset-0 h-full w-full flex items-center justify-center">
      <BeatLoader size={25} color={"#60a5fa"} />
    </div>
  );
};

const PostForm = ({
  handlePostSubmit,
  handleTitleInput,
  toggleImgUploadModal,
  toggleGifModal,
  toggleLinkModal,
  handlePostInput,
  title,
  postToEdit,
  editTitle,
  postText,
  editText,
  editTitleRef,
  editTextRef,
  imgDom,
  setImgDom,
  deletePostPreview,
  handleEditPostSubmit,
  handleEditCommentSubmit,
  handleEditTitleInput,
  handleEditText,
  handleEditCommentText,
}: FormProps) => {
  const { tempPostImg, scrapedPost, previewLoading, editId, editModalOpen, error } = useSelector((state) => state.posts);
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const createPage = pathname === "/create";
  const commentPage = pathname.includes("comments");
  const [titleInputValue, setTitleInputValue] = useState("");

  const handleCancelBtn = useCallback(() => {
    if (createPage) {
      dispatch(clearTempPostImgAction());
      dispatch(clearTempPreviewAction());
      return history.push("/feed");
    }
    if (editModalOpen) {
      dispatch(clearTempPostImgAction());
      dispatch(clearTempPreviewAction());
      dispatch(clearEditIdAction());
      return dispatch(toggleEditModalAction());
    }
  }, [dispatch, createPage, editModalOpen]);

  const handleImgPost = useCallback(() => {
    if (editId.type === "comment" || editId.type === "reply") return setImgDom!(null);
    const postImg = <img id="postImg" src={fromCDN(tempPostImg)} alt="" className="h-max rounded max-h-[500px]" />;
    if (tempPostImg?.length > 0) return setImgDom!(postImg);
    if (previewLoading) return setImgDom!(<PreviewLoader />);
    if (!isObjectEmpty(scrapedPost)) return setImgDom!(<LinkPreview linkPreview={scrapedPost} />);
    return setImgDom!(null);
  }, [createPage, editId.type, tempPostImg, setImgDom, scrapedPost, previewLoading]);

  const handleBlur = useCallback(
    (e) => {
      if (error) return;
      editId.type === "post"
        ? handleEditText!(e)
        : editId.type === "comment" || editId.type === "reply"
        ? handleEditCommentText!(e)
        : handlePostInput!(e);
    },
    [editId.type, handleEditText, handleEditCommentText, handlePostInput]
  );

  useEffect(() => {
    handleImgPost();
  }, [editId.type, tempPostImg, postToEdit, scrapedPost, previewLoading]);

  useEffect(() => {
    console.log("editText form", editText);
  }, []);

  return (
    <form
      className={`${
        width < breakpoint.md && !commentPage ? "min-h-[calc(100vh-8rem)]" : "min-h-[max-content]"
      }  h-full w-full flex flex-col items-center justify-start md:justify-center space-y-4 transition-color duration-500 bg-white dark:bg-gray-900 border-t border-b md:border dark:border-gray-700 md:rounded pt-4 pb-6 md:pt-6 md:pb-6 px-4`}
      method="post"
      onSubmit={
        editId?.type === "post"
          ? handleEditPostSubmit
          : editId?.type === "comment" || editId?.type === "reply"
          ? handleEditCommentSubmit
          : handlePostSubmit
      }
    >
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={handleCancelBtn}
          className="w-8 h-8 outline-none mb-2 md:mb-0 md:w-max md:h-max self-start flex items-center justify-center md:space-x-2 text-white md:px-4 md:py-2 rounded-full shadow-xl bg-gray-500 dark:bg-gray-600 transition duration-300 hover:bg-black dark:hover:bg-black  hover:shadow-none dark:border dark:border-gray-600"
        >
          <span className="hidden md:inline-block text-xs capitalize">{userLanguage.createPost.cancelBtn}</span> <XLg size={12} />
        </button>
        {tempPostImg || !isObjectEmpty(scrapedPost) || postToEdit?.isPreview ? (
          <button
            type="button"
            onClick={() =>
              tempPostImg.length > 0
                ? dispatch(clearTempPostImgAction())
                : !isObjectEmpty(scrapedPost)
                ? deletePostPreview!()
                : undefined
            }
            className="h-8 w-max rounded-full px-2  border whitespace-wrap text-xs text-gray-500 dark:text-gray-200 flex items-center justify-end text-right"
          >
            {userLanguage.createPost.deleteImgBtn}
          </button>
        ) : null}
      </div>
      {(createPage || editId.type === "post") && (
        <input
          className="h-10 w-full px-2 rounded outline-none text-gray-900 dark:text-gray-100 dark:caret-white bg-gray-100 dark:bg-gray-700 hover:bg-white active:bg-white focus:bg-white border border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-200 transition-all duration-200 placeholder-gray-400 dark:placeholder-[#999999]"
          type="text"
          name="Title"
          id="title"
          ref={editTitleRef}
          placeholder={createPage ? userLanguage.createPost.titlePlaceholder : undefined}
          onChange={editId.type === "post" ? handleEditTitleInput! : (e) => handleTitleInput!(e)}
          value={editTitle ? editTitle : title ? title : ""}
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
                  !isObjectEmpty(scrapedPost) || tempPostImg?.length !== 0 || postToEdit?.isPreview ? "min-content" : "12rem",
              }}
              className="w-full inline-block focus:outline-none text-gray-900 dark:text-gray-100 dark:caret-white p-2"
              contentEditable="true"
              suppressContentEditableWarning={true}
              placeholder={userLanguage.createPost.textPlaceholder}
              onBlur={(e) => handleBlur(e)}
              ref={editTextRef}
            >
              {postText ? postText : editText ? editText : ""}
            </span>
            <div id="imgContainer" className="px-2 flex items-start justify-center">
              {imgDom}
            </div>
          </div>
        </div>
        <div
          className={`w-full h-max flex items-center ${
            createPage || editId.type === "post" ? "justify-between" : "justify-end"
          } px-1 pb-4 overflow-y-auto space-x-6`}
        >
          {(createPage || editId.type === "post") && (
            <div className="w-max h-full flex items-center justify-start space-x-2">
              <button
                type="button"
                className="h-10 w-max text-gray-500 dark:text-gray-100 text-xs rounded-full transition-color duration-300 border border-gray-200 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-100 px-4 py-2 bg-transparent ouline-none flex items-center justify-start space-x-1"
                onClick={toggleImgUploadModal}
              >
                <Image size={16} className="text-gray-900 dark:text-gray-100" />
                <span className="hidden md:inline-block text-sm">{userLanguage.createPost.imgBtn}</span>
              </button>
              <button
                type="button"
                className="h-10 w-max text-gray-500 dark:text-gray-100 text-xs rounded-full transition-color duration-300 border border-gray-200 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-100 px-4 py-2 bg-transparent ouline-none flex items-center justify-start space-x-1"
                onClick={toggleGifModal}
              >
                <img src={giphyDark} width="25" alt="giphy logo" />{" "}
                <span className="hidden md:inline-block text-sm">{userLanguage.createPost.gifBtn}</span>
              </button>
              <button
                type="button"
                className="h-10 w-max text-gray-500 dark:text-gray-100 text-xs rounded-full transition-color duration-300 border border-gray-200 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-100 px-4 py-2 bg-transparent ouline-none flex items-center justify-start"
                onClick={toggleLinkModal}
              >
                <Link45deg size={20} className="text-gray-900 dark:text-gray-100" />
                <span className="hidden md:inline-block text-sm capitalize">{userLanguage.createPost.linkBtn}</span>
              </button>
            </div>
          )}
          <button
            className="h-10 w-10 3xs:h-max 3xs:w-max flex items-center justify-center space-x-1 text-white 3xs:py-3 3xs:px-6 rounded-full shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
            type="submit"
          >
            <PaperAirplaneIcon className="h-5 text-white transform rotate-45 -translate-y-0.5" />
            <span className="hidden 3xs:inline-block text-sm uppercase">{userLanguage.createPost.publishBtn}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;

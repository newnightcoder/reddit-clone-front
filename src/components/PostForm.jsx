import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import React from "react";
import { Image, Link45deg, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { clearTempPostImg } from "../store/actions/posts.action";
import { useLanguage } from "../utils/hooks";

const PostForm = ({
  title,
  handlePostSubmit,
  handleTitleInput,
  toggleImgInput,
  toggleUrlInput,
  toggleYoutubeInput,
  handlePostInput,
  postToEdit,
  postTitle,
  postText,
  postImgUrl,
  handleEditSubmit,
  handleEditTitleInput,
  handleEditText,
}) => {
  const currentPostImgUrl = useSelector((state) => state.posts.currentPost.imgUrl);
  const { pathname } = useLocation();
  const imgDom = currentPostImgUrl ? <img id="postImg" src={currentPostImgUrl} alt="" className="w-full" /> : null;
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);
  console.log(process.env);
  const fetchGifs = (offset) => giphy.trending({ offset, limit: 5 });
  const test = () => {
    return console.log("yay babe");
  };

  return (
    <form
      className="h-max w-full flex flex-col items-center justify-center space-y-4 bg-white border rounded py-6 px-4"
      method="post"
      onSubmit={pathname === "/edit" ? handleEditSubmit : handlePostSubmit}
    >
      <div className="h-48 w-max relative overflow-scroll border border-red-500">
        <Grid width={200} columns={3} fetchGifs={fetchGifs} onGifsFetchError={test} />
      </div>
      <Link
        to={"/feed"}
        className="w-8 h-8 md:w-max md:h-max self-start flex items-center justify-center md:space-x-2 text-white md:px-4 md:py-2 rounded-full shadow-xl bg-gray-500 transition-all duration-300 hover:bg-black hover:shadow-none"
        disabled={false}
      >
        <span className="hidden md:inline-block text-xs capitalize">{userLanguage.createPost.cancelBtn}</span> <XLg size={12} />
      </Link>
      <input
        className="h-10 w-full px-2 rounded outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white border border-gray-400 hover:border-gray-500 transition-all duration-200 placeholder-gray-400"
        type="text"
        name="Title"
        id="title"
        placeholder={pathname === "/create" ? userLanguage.createPost.titlePlaceholder : null}
        onChange={pathname === "/edit" ? (e) => handleEditTitleInput(e) : (e) => handleTitleInput(e)}
        value={pathname === "/edit" ? postTitle : title}
      />
      <div className="form-container h-full w-full flex flex-col items-center justify-start space-y-6">
        <div className="h-max w-full border border-gray-400 hover:border-gray-500 transition-border-color duration-300 rounded">
          <div
            style={{ minHeight: "12rem" }}
            className="container relative max-w-full bg-gray-100 hover:bg-white active:bg-white focus:bg-white rounded-bl rounded-br overflow-y-auto"
          >
            <span
              id="postInput"
              style={{ minHeight: !currentPostImgUrl ? "12rem" : "max-content" }}
              className="w-full h-full block focus:outline-none p-2"
              contentEditable="true"
              suppressContentEditableWarning={true}
              placeholder={userLanguage.createPost.textPlaceholder}
              onBlur={pathname === "/edit" ? handleEditText : handlePostInput}
            >
              {postText && postText}
            </span>
            <div id="imgContainer" className="px-2">
              {imgDom}
            </div>
          </div>
        </div>
        <div className="w-full h-max flex items-center justify-between px-8">
          <div className="w-2/3 h-full flex items-center justify-start space-x-2">
            <button
              className="h-10 w-max text-gray-900 text-xs bg-transparent ouline-none flex items-center justify-start space-x-1"
              onClick={(e) => toggleImgInput(e)}
            >
              <Image size={16} className="text-gray-900" />
              <span className="hidden md:inline-block">
                {!currentPostImgUrl ? userLanguage.createPost.imgBtn : userLanguage.createPost.changeImgBtn}
              </span>
            </button>
            <button
              className="h-8 w-max  text-gray-900 text-xs bg-transparent ouline-none flex items-center justify-start"
              onClick={(e) => toggleUrlInput(e)}
            >
              <Link45deg size={20} className="text-gray-900" />{" "}
              <span className="hidden md:inline-block">{userLanguage.createPost.gifBtn}</span>
            </button>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              currentPostImgUrl && dispatch(clearTempPostImg());
            }}
            className="w-1/3 h-full whitespace-wrap text-xs text-gray-900 underline flex items-center justify-end text-right"
          >
            {currentPostImgUrl ? userLanguage.createPost.deleteImgBtn : null}
          </button>
          <button
            className="w-48 flex items-center justify-center space-x-1 text-white p-3 rounded-full disabled:opacity-50 shadow-xl bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:shadow-none"
            disabled={false}
            type="submit"
          >
            <PaperAirplaneIcon className="h-5 w-5 text-white transform rotate-45 -translate-y-0.5" />
            <span className="text-sm uppercase">{userLanguage.createPost.publishBtn}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;

import "draft-js/dist/Draft.css";
import React, { useState } from "react";
import { XLg } from "react-bootstrap-icons";
// import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { PostForm } from "../components";
import Aside from "../components/Aside";
import ImgUploadModal from "../components/createPostModals/ImgUploadModal";
import UrlModal from "../components/createPostModals/UrlModal";
import YoutubeLinkModal from "../components/createPostModals/YoutubeLinkModal";
import { createPost } from "../store/actions/posts.action";
import { createDate } from "../utils/formatTime";
import history from "../utils/history";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState(null);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [imgInputModalOpen, setImgInputModalOpen] = useState(false);
  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const [youtubeModalOpen, setYoutubeModalOpen] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const emptyTitleError = "Votre titre est vide!\n Mettez un mot ou deux...";
  const serverError = useSelector((state) => state.posts.error);
  const userId = useSelector((state) => state.user.id);
  const { isAuthenticated } = useSelector((state) => state.user);
  const postImg = useSelector((state) => state.posts.currentPost.imgUrl);
  const dispatch = useDispatch();

  const handleTitleInput = (e) => {
    setTitle(e.currentTarget.value);
    setEmptyTitle(false);
  };

  const handlePostInput = (e) => {
    // postText.current = e.target.value;
    console.log(e.currentTarget.textContent);
    setPostText(e.currentTarget.textContent);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (title.length === 0) return setEmptyTitle(true);
    if (serverError.length !== 0) return setServerErrorMsg(serverError);
    setServerErrorMsg("");
    dispatch(createPost(userId, title, postText, createDate(), postImg));
    history.push({
      pathname: "/feed",
    });
  };

  const toggleImgInput = (e) => {
    e.preventDefault();
    setUrlModalOpen(false);
    setYoutubeModalOpen(false);
    setImgInputModalOpen((prev) => !prev);
    console.log("youtubeModalOpen toggleImgInput:", youtubeModalOpen);
  };

  const toggleUrlInput = (e) => {
    e.preventDefault();
    setImgInputModalOpen(false);
    setYoutubeModalOpen(false);
    setUrlModalOpen((prev) => !prev);
    console.log("youtubeModalOpen toggleUrlInput:", youtubeModalOpen);
  };

  const toggleYoutubeInput = (e) => {
    e.preventDefault();
    setImgInputModalOpen(false);
    setUrlModalOpen(false);
    setYoutubeModalOpen((prev) => !prev);
    console.log("youtubeModalOpen toggleYoutubeInput:", youtubeModalOpen);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <div className="w-full h-full flex items-start justify-center py-8">
          <div className="w-1/2 flex flex-col items-start justify-center mr-8" style={{ height: "calc(100vh - 4rem)" }}>
            <div
              className="error h-12 w-10/12 md:w-1/2 xl:w-1/3 whitespace-pre bg-black text-white text-sm text-center py-1 rounded"
              style={{ display: emptyTitle ? "block" : "none" }}
            >
              {emptyTitle && emptyTitleError}
              {serverError.length !== 0 && serverErrorMsg}
            </div>
            <PostForm
              handlePostSubmit={handlePostSubmit}
              handleTitleInput={handleTitleInput}
              toggleImgInput={toggleImgInput}
              toggleUrlInput={toggleUrlInput}
              toggleYoutubeInput={toggleYoutubeInput}
              handlePostInput={handlePostInput}
            />
            <div className="h-1/4 w-full flex flex-col items-center justify-center rounded-full">
              <Link
                to={"/feed"}
                className="h-12 w-12 bg-gray-500 transition-color duration-300 hover:bg-black md:h-auto md:w-max flex items-center justify-center md:space-x-2 text-white px-2 py-2 md:py-1 md:px-5 rounded-full md:rounded shadow-xl"
                disabled={false}
              >
                <span className="hidden md:inline-block text-sm uppercase">annuler</span> <XLg />
              </Link>
            </div>
          </div>
          <Aside />
          <ImgUploadModal imgInputModalOpen={imgInputModalOpen} toggleImgInput={toggleImgInput} />
          <UrlModal urlModalOpen={urlModalOpen} toggleUrlInput={toggleUrlInput} />
          <YoutubeLinkModal youtubeModalOpen={youtubeModalOpen} toggleYoutubeInput={toggleYoutubeInput} />
        </div>
      )}
    </>
  );
};

export default CreatePost;

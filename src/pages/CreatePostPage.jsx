import { PaperAirplaneIcon } from "@heroicons/react/solid";
import "draft-js/dist/Draft.css";
import React, { useState } from "react";
import { Image, Link45deg, XLg, Youtube } from "react-bootstrap-icons";
// import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ImgUploadModal from "../components/createPostModals/ImgUploadModal";
import UrlModal from "../components/createPostModals/UrlModal";
import YoutubeLinkModal from "../components/createPostModals/YoutubeLinkModal";
import { createPost } from "../store/actions/posts.action";
import { createDate } from "../utils/formatTime";
import history from "../utils/history";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  // const postText = useRef("");
  const [postText, setPostText] = useState("");
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [imgInputModalOpen, setImgInputModalOpen] = useState(false);
  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const [youtubeModalOpen, setYoutubeModalOpen] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const emptyTitleError = "Votre titre est vide!\n Mettez un mot ou deux...";
  const serverError = useSelector((state) => state.posts.error);
  const userId = useSelector((state) => state.user.id);
  const isAuthenticated = useSelector((state) => state.user.loginSuccess);
  const dispatch = useDispatch();
  const postImg = useSelector((state) => state.posts.currentPost.imgUrl);
  // const postImg = "";

  console.log(postImg);

  const handleTitleInput = (e) => {
    setTitle(e.currentTarget.value);
    setEmptyTitle(false);
  };

  const handlePostInput = (e) => {
    // postText.current = e.target.value;
    setPostText(e.currentTarget.value);
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
        <div
          className="w-screen bg-gray-200 flex flex-col items-center justify-center space-y-2 pt-2"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div
            className="error h-12 w-10/12 md:w-1/2 xl:w-1/3 whitespace-pre bg-black text-white text-sm text-center py-1 rounded"
            style={{ visibility: emptyTitle ? "visible" : "hidden" }}
          >
            {emptyTitle && emptyTitleError}
            {serverError.length !== 0 && serverErrorMsg}
          </div>
          <div className="h-3/4 w-10/12 relative md:w-1/2 lg:w-1/3">
            <form className="h-full w-full flex flex-col items-center justify-center" method="post" onSubmit={handlePostSubmit}>
              <input
                className="h-10 w-full px-2 rounded outline-none bg-gray-100 hover:bg-white active:bg-white focus:bg-white border border-gray-400 hover:border-gray-500 transition-all duration-200"
                type="text"
                name="createPost"
                id="createPost"
                placeholder="Titre de votre post"
                onChange={handleTitleInput}
              />
              <div className="form-container h-full w-full flex flex-col items-center justify-start pt-4">
                <div className="h-max w-full border border-gray-400 hover:border-gray-500 transition-border-color duration-300 rounded">
                  <div className="h-12 w-full flex items-center justify-between rounded-t bg-black border-b border-gray-300 pl-2 pr-4">
                    <div className="w-2/3 h-full flex items-center justify-start">
                      <button
                        className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center"
                        onClick={(e) => toggleImgInput(e)}
                      >
                        <Image className="text-gray-100" />
                      </button>
                      <button
                        className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center"
                        onClick={(e) => toggleUrlInput(e)}
                      >
                        <Link45deg size={20} className="text-gray-100" />
                      </button>
                      <button
                        className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center"
                        onClick={(e) => toggleYoutubeInput(e)}
                      >
                        <Youtube size={20} className="text-red-600" />
                      </button>
                    </div>
                    <div className="w-1/3 h-full whitespace-wrap text-xs text-gray-100 underline flex items-center justify-end text-right">
                      Enregistrer <br />
                      le brouillon
                    </div>
                  </div>
                  <div className="container relative max-w-full h-56 bg-gray-100 hover:bg-white active:bg-white focus:bg-white rounded-bl rounded-br overflow-y-auto">
                    <textarea
                      type="text"
                      name="post"
                      id="post"
                      value={postText}
                      onChange={handlePostInput}
                      className="w-full h-full focus:ring-red-300 flex items-start justify-start p-2"
                    />
                    {/* <ContentEditable
                      html={`<div className="p-2">${postText.current}</div>`}
                      onChange={handlePostInput}
                      className="w-full h-full focus:ring-red-300 flex flex-col items-start justify-start p-2"
                    /> */}
                  </div>
                </div>
                <button
                  className="w-48 flex items-center justify-center space-x-1 text-white p-3 rounded disabled:opacity-50 mt-4 shadow-xl"
                  style={{ backgroundColor: "#ef5350" }}
                  disabled={false}
                  type="submit"
                >
                  <PaperAirplaneIcon className="h-5 w-5 text-white transform rotate-45 -translate-y-0.5" />
                  <span className="text-sm uppercase">publier!</span>
                </button>
              </div>
            </form>
            <ImgUploadModal imgInputModalOpen={imgInputModalOpen} toggleImgInput={toggleImgInput} />
            <UrlModal urlModalOpen={urlModalOpen} toggleUrlInput={toggleUrlInput} />
            <YoutubeLinkModal youtubeModalOpen={youtubeModalOpen} toggleYoutubeInput={toggleYoutubeInput} />
          </div>
          <div className="h-1/4 flex flex-col items-center justify-center rounded-full">
            <Link
              to={"/feed"}
              className="h-12 w-12 bg-gray-500 transition-color duration-300 hover:bg-black md:h-auto md:w-max flex items-center justify-center md:space-x-2 text-white px-2 py-2 md:py-1 md:px-5 rounded-full md:rounded shadow-xl"
              disabled={false}
            >
              <span className="hidden md:inline-block text-sm uppercase">annuler</span> <XLg />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;

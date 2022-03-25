import "draft-js/dist/Draft.css";
import React, { useCallback, useState } from "react";
// import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { PostForm } from "../components";
import Layout from "../components/ Layout";
import ImgUploadModal from "../components/createPostModals/ImgUploadModal";
import UrlModal from "../components/createPostModals/UrlModal";
import YoutubeLinkModal from "../components/createPostModals/YoutubeLinkModal";
import { createPost } from "../store/actions/posts.action";
import { history } from "../utils/helpers";
import { createDate } from "../utils/helpers/formatTime";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
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

  const handleTitleInput = useCallback((e) => {
    setTitle(e.currentTarget.value);
    setEmptyTitle(false);
  });

  const handlePostInput = (e) => {
    // postText.current = e.target.value;
    console.log(e.currentTarget.innerHTML);
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
        <Layout>
          <div className="w-full flex flex-col items-center justify-center pt-24" style={{ height: "calc(100vh - 5rem)" }}>
            {/* <h1 className="w-full text-left py-2 text-xl pl-48">Publier un post</h1> */}
            <div className="w-full h-full flex items-start justify-center space-x-8">
              <div className="h-max w-10/12 max-w-3xl flex flex-col items-center justify-center">
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
              </div>
            </div>
            <ImgUploadModal imgInputModalOpen={imgInputModalOpen} toggleImgInput={toggleImgInput} />
            <UrlModal urlModalOpen={urlModalOpen} toggleUrlInput={toggleUrlInput} />
            <YoutubeLinkModal youtubeModalOpen={youtubeModalOpen} toggleYoutubeInput={toggleYoutubeInput} />
          </div>
        </Layout>
      )}
    </>
  );
};

export default CreatePost;

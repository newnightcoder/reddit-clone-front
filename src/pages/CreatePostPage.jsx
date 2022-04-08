import "draft-js/dist/Draft.css";
import React, { useCallback, useRef, useState } from "react";
// import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { ImgUploadModal, Layout, PostForm, UrlModal } from "../components";
import { clearTempPostImg, createPost } from "../store/actions/posts.action";
import { history } from "../utils/helpers";
import { createDate } from "../utils/helpers/formatTime";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const postImg = useSelector((state) => state.posts.currentPost.imgUrl);
  const postImgRef = useRef(postImg);
  const postImgInTheDom = useRef(document.querySelector("#postImg"));
  const [imgAdded, setImgAdded] = useState(false);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [imgInputModalOpen, setImgInputModalOpen] = useState(false);
  const [urlModalOpen, setUrlModalOpen] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const emptyTitleError = "Votre titre est vide!\n Mettez un mot ou deux...";
  const serverError = useSelector((state) => state.posts.error);
  const { isAuthenticated, id } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleTitleInput = useCallback((e) => {
    setTitle(e.currentTarget.value);
    setEmptyTitle(false);
  });

  const handlePostInput = useCallback((e) => {
    setPostText(e.currentTarget.textContent);
  });

  const handlePostSubmit = useCallback((e) => {
    e.preventDefault();
    if (title.length === 0) return setEmptyTitle(true);
    if (serverError.length !== 0) return setServerErrorMsg(serverError);
    setServerErrorMsg("");
    console.log("image:", postImg);

    dispatch(createPost(id, title, postText, createDate(), postImg && postImg));
    dispatch(clearTempPostImg());
    history.push({
      pathname: "/feed",
    });
  });

  const toggleImgInput = useCallback((e) => {
    e.preventDefault();
    setUrlModalOpen(false);
    setImgInputModalOpen((prev) => !prev);
  });

  const toggleUrlInput = useCallback((e) => {
    e.preventDefault();
    setImgInputModalOpen(false);
    setUrlModalOpen((prev) => !prev);
  });

  const toggleYoutubeInput = useCallback((e) => {
    e.preventDefault();
    setImgInputModalOpen(false);
    setUrlModalOpen(false);
  });

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <Layout>
          <div className="w-full flex flex-col items-center justify-start pt-16 pb-4" style={{ minHeight: "calc(100vh - 4rem)" }}>
            {/* <h1 className="w-full text-left py-2 text-xl pl-48">Publier un post</h1> */}
            <div className="w-full h-full flex items-start justify-center space-x-8">
              <div className="h-max w-11/12 max-w-2xl flex flex-col items-center justify-center">
                <div
                  className="error h-12 w-10/12 md:w-1/2 xl:w-1/3 whitespace-pre bg-black text-white text-sm text-center py-1 rounded"
                  style={{ display: emptyTitle ? "block" : "none" }}
                >
                  {emptyTitle && emptyTitleError}
                  {serverError.length !== 0 && serverErrorMsg}
                </div>
                <PostForm
                  title={title}
                  handlePostSubmit={handlePostSubmit}
                  handleTitleInput={handleTitleInput}
                  toggleImgInput={toggleImgInput}
                  toggleUrlInput={toggleUrlInput}
                  toggleYoutubeInput={toggleYoutubeInput}
                  handlePostInput={handlePostInput}
                />
              </div>
            </div>
            <ImgUploadModal imgInputModalOpen={imgInputModalOpen} toggleImgInput={toggleImgInput} setImgAdded={setImgAdded} />
            <UrlModal urlModalOpen={urlModalOpen} toggleUrlInput={toggleUrlInput} />
          </div>
        </Layout>
      )}
    </>
  );
};

export default CreatePost;

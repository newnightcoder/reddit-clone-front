import "draft-js/dist/Draft.css";
import React, { useCallback, useEffect, useState } from "react";
// import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { GifModal, ImgUploadModal, Layout, PostForm, PreviewLinkModal } from "../components";
import { clearTempPostImg, clearTempPreview, createPost } from "../store/actions/posts.action";
import { createDate } from "../utils/helpers/formatTime";
import history from "../utils/helpers/history";
import { useHandleLink } from "../utils/hooks";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const postImg = useSelector((state) => state.posts.currentPost.imgUrl);
  const [imgAdded, setImgAdded] = useState(false);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [imgInputModalOpen, setImgInputModalOpen] = useState(false);
  const [gifModalOpen, setGifModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const emptyTitleError = "Votre titre est vide!\n Mettez un mot ou deux...";
  const serverError = useSelector((state) => state.posts.error);
  const { isAuthenticated, id } = useSelector((state) => state.user);
  const [isPreview, setIsPreview] = useState(0);
  const preview = useSelector((state) => state.posts.scrapedPost);
  const dispatch = useDispatch();
  const handleLink = useHandleLink();
  const isObjectEmpty = useCallback((obj) => {
    for (let prop in obj) {
      return false;
    }
    return true;
  }, []);

  useEffect(() => {
    if (!isObjectEmpty(preview)) setIsPreview(1);
  }, [preview]);

  const handleTitleInput = useCallback((e) => {
    setTitle(e.currentTarget.value);
    setEmptyTitle(false);
  });

  const handlePostInput = useCallback((e) => {
    setPostText(e.currentTarget.textContent);
  });

  const handlePostSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (title.length === 0) return setEmptyTitle(true);
      if (serverError.length !== 0) return setServerErrorMsg(serverError);
      setServerErrorMsg("");
      if (!isAuthenticated) return handleLink("post");
      dispatch(createPost(id, title, postText, createDate(), postImg && postImg, isPreview, preview));
      dispatch(clearTempPostImg());
      dispatch(clearTempPreview());
      history.push({
        pathname: "/feed",
      });
    },
    [dispatch, title, postText, id, postImg, isPreview, preview]
  );

  const toggleImgUploadModal = useCallback((e) => {
    e.preventDefault();
    setGifModalOpen(false);
    setImgInputModalOpen((prev) => !prev);
  });

  const toggleGifModal = useCallback((e) => {
    e.preventDefault();
    setImgInputModalOpen(false);
    setGifModalOpen((prev) => !prev);
  });

  const toggleLinkModal = useCallback((e) => {
    e.preventDefault();
    setLinkModalOpen((prevState) => !prevState);
  });

  return (
    <>
      <Layout>
        <div
          className="w-full flex flex-col items-center justify-start md:pt-16 md:pb-4"
          style={{ minHeight: "calc(100vh - 4rem)" }}
        >
          {/* <h1 className="w-full text-left py-2 text-xl pl-48">Publier un post</h1> */}
          <div className="w-full h-full flex items-start justify-center space-x-8">
            <div className="h-max w-full md:max-w-2xl flex flex-col items-center justify-center">
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
                toggleImgUploadModal={toggleImgUploadModal}
                toggleGifModal={toggleGifModal}
                toggleLinkModal={toggleLinkModal}
                handlePostInput={handlePostInput}
              />
            </div>
          </div>
          <ImgUploadModal
            imgInputModalOpen={imgInputModalOpen}
            toggleImgUploadModal={toggleImgUploadModal}
            setImgAdded={setImgAdded}
          />
          <GifModal gifModalOpen={gifModalOpen} toggleGifModal={toggleGifModal} />
          <PreviewLinkModal linkModalOpen={linkModalOpen} toggleLinkModal={toggleLinkModal} />
        </div>
      </Layout>
    </>
  );
};

export default CreatePost;

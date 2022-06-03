import "draft-js/dist/Draft.css";
import React, { useCallback, useEffect, useState } from "react";
// import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { GifModal, ImgUploadModal, Layout, PostForm, PreviewLinkModal } from "../components";
import { clearErrorPost, clearTempPostImg, clearTempPreview, createPost, setErrorPost } from "../store/actions/posts.action";
import { createDate } from "../utils/helpers/formatTime";
import history from "../utils/helpers/history";
import { isObjectEmpty } from "../utils/helpers/isObjectEmpty";
import { useError, useHandleLink } from "../utils/hooks";
import useLanguage from "../utils/hooks/useLanguage";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const postImg = useSelector((state) => state.posts.currentPost.imgUrl);
  const { scrapedPost: preview } = useSelector((state) => state.posts);
  const { isAuthenticated, id } = useSelector((state) => state.user);
  const [imgAdded, setImgAdded] = useState(false);
  const [imgDom, setImgDom] = useState(null);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [imgInputModalOpen, setImgInputModalOpen] = useState(false);
  const [gifModalOpen, setGifModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(0);
  const dispatch = useDispatch();
  const handleLink = useHandleLink();
  const userLanguage = useLanguage();
  const error = useError();

  const deletePreview = useCallback(() => {
    setIsPreview(0);
    dispatch(clearTempPreview());
  }, [dispatch, setIsPreview]);

  useEffect(() => {
    dispatch(clearTempPostImg());
    dispatch(clearTempPreview());
    dispatch(clearErrorPost());
  }, []);

  useEffect(() => {
    if (!isObjectEmpty(preview)) setIsPreview(1);
  }, [preview]);

  const handleTitleInput = useCallback((e) => {
    if (error) {
      dispatch(clearErrorPost());
    }
    setTitle(e.currentTarget.value);
  });

  const handlePostInput = useCallback((e) => {
    setPostText(e.currentTarget.textContent);
  });

  const handlePostSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (title.length === 0) return dispatch(setErrorPost("emptyTitle"));
      if (!isAuthenticated) return handleLink("post");
      if (error) return;
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
          <div className="w-full h-full flex items-start justify-center space-x-8">
            <div className="h-max w-full md:max-w-2xl flex flex-col items-center justify-center">
              <div
                className="error md:absolute md:top-0 h-12 w-full md:w-1/2 xl:w-1/3 items-center justify-center bg-black text-white text-sm py-1 rounded mb-4 text-center whitespace-pre"
                style={{ display: error ? "flex" : "none" }}
              >
                {error}
              </div>
              <PostForm
                title={title}
                handlePostSubmit={handlePostSubmit}
                handleTitleInput={handleTitleInput}
                toggleImgUploadModal={toggleImgUploadModal}
                toggleGifModal={toggleGifModal}
                toggleLinkModal={toggleLinkModal}
                handlePostInput={handlePostInput}
                imgDom={imgDom}
                setImgDom={setImgDom}
                setIsPreview={setIsPreview}
              />
            </div>
          </div>
          <ImgUploadModal
            imgInputModalOpen={imgInputModalOpen}
            toggleImgUploadModal={toggleImgUploadModal}
            setImgAdded={setImgAdded}
            deletePreview={deletePreview}
          />
          <GifModal gifModalOpen={gifModalOpen} toggleGifModal={toggleGifModal} deletePreview={deletePreview} />
          <PreviewLinkModal linkModalOpen={linkModalOpen} toggleLinkModal={toggleLinkModal} />
        </div>
      </Layout>
    </>
  );
};

export default CreatePost;

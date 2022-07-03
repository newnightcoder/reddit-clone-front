import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, GifModal, ImgUploadModal, Layout, PostForm, PreviewLinkModal } from "../components";
import {
  clearErrorPostAction,
  clearTempPostImgAction,
  clearTempPreviewAction,
  createPostAction,
  setErrorPostAction,
} from "../store/actions/posts.action";
import { clearErrorUserAction } from "../store/actions/user.action";
import { IPost } from "../store/types";
import { history, isObjectEmpty } from "../utils/helpers";
import { createDate } from "../utils/helpers/formatTime";
import { useError, useHandleLink, useLanguage, useToggle } from "../utils/hooks";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const { tempPostImg: postImg, scrapedPost: preview } = useSelector((state) => state.posts);
  const { isAuthenticated, id, username } = useSelector((state) => state.user);
  const [imgDom, setImgDom] = useState<JSX.Element | null>(null);
  const [imgUploadModalOpen, setImgUploadModalOpen] = useState(false);
  const [gifModalOpen, setGifModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const dispatch = useDispatch();
  const handleLink = useHandleLink();
  const error = useError();
  const userLanguage = useLanguage();
  const creationDate = createDate();
  const newPost: IPost = {
    author: { id: id!, username },
    title,
    text: postText,
    date: creationDate,
    imgUrl: postImg && postImg,
    isPreview,
    preview,
  };

  const deletePreview = useCallback(() => {
    setIsPreview(false);
    dispatch(clearTempPreviewAction());
  }, [dispatch, setIsPreview]);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(clearTempPostImgAction());
    dispatch(clearTempPreviewAction());
    dispatch(clearErrorPostAction());
    dispatch(clearErrorUserAction());
  }, []);

  useEffect(() => {
    if (!isObjectEmpty(preview)) setIsPreview(true);
  }, [preview]);

  const handleTitleInput = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPostAction());
      }
      setTitle(e.currentTarget.value);
    },
    [error]
  );

  const handlePostInput = useCallback((e) => {
    setPostText(e.currentTarget.textContent);
  }, []);

  const handlePostSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (title.length === 0) return dispatch(setErrorPostAction("emptyTitle"));
      if (!isAuthenticated) return handleLink("post");
      if (error) return;
      dispatch(createPostAction(newPost));
      dispatch(clearTempPostImgAction());
      dispatch(clearTempPreviewAction());
      history.push("/feed");
    },
    [dispatch, title, postText, id, postImg, isPreview, preview]
  );

  const toggleImgUploadModal = useToggle(imgUploadModalOpen, setImgUploadModalOpen);
  const toggleGifModal = useToggle(gifModalOpen, setGifModalOpen);
  const toggleLinkModal = useToggle(linkModalOpen, setLinkModalOpen);

  return (
    <>
      <Layout>
        <div className="w-full flex flex-col items-center justify-start pb-32 md:pb-16 pt-20 md:pt-24 lg:border-r lg:border-l lg:border-[#ededed] dark:md:border-gray-900 transition duration-500 md:px-12">
          <Error />
          <span className="absolute top-5 md:top-8 mx-auto font-bold text-sm italic text-gray-900 dark:text-blue-400 text-center whitespace-nowrap">
            {userLanguage.createPost.heading1} <br />
            {userLanguage.createPost.heading2}
          </span>
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
          />
          <ImgUploadModal
            imgUploadModalOpen={imgUploadModalOpen}
            toggleImgUploadModal={toggleImgUploadModal}
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

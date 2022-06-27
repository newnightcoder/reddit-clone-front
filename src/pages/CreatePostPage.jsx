import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, GifModal, ImgUploadModal, Layout, PostForm, PreviewLinkModal } from "../components";
import { clearErrorPost, clearTempPostImg, clearTempPreview, createPost, setErrorPost } from "../store/actions/posts.action";
import { clearErrorUser } from "../store/actions/user.action";
import { history, isObjectEmpty } from "../utils/helpers";
import { createDate } from "../utils/helpers/formatTime";
import { useError, useHandleLink, useLanguage } from "../utils/hooks";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const postImg = useSelector((state) => state.posts.currentPost.imgUrl);
  const { scrapedPost: preview } = useSelector((state) => state.posts);
  const { isAuthenticated, id } = useSelector((state) => state.user);
  const [imgAdded, setImgAdded] = useState(false);
  const [imgDom, setImgDom] = useState(null);
  const [imgInputModalOpen, setImgInputModalOpen] = useState(false);
  const [gifModalOpen, setGifModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(0);
  const dispatch = useDispatch();
  const handleLink = useHandleLink();
  const error = useError();
  const userLanguage = useLanguage();

  const deletePreview = useCallback(() => {
    setIsPreview(0);
    dispatch(clearTempPreview());
  }, [dispatch, setIsPreview]);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(clearTempPostImg());
    dispatch(clearTempPreview());
    dispatch(clearErrorPost());
    dispatch(clearErrorUser());
  }, []);

  useEffect(() => {
    if (!isObjectEmpty(preview)) setIsPreview(1);
  }, [preview]);

  const handleTitleInput = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPost());
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
      if (title.length === 0) return dispatch(setErrorPost("emptyTitle"));
      if (!isAuthenticated) return handleLink("post");
      if (error) return;
      dispatch(createPost(id, title, postText, createDate(), postImg && postImg, isPreview, preview));
      dispatch(clearTempPostImg());
      dispatch(clearTempPreview());
      history.push("/feed");
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
            setIsPreview={setIsPreview}
          />
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

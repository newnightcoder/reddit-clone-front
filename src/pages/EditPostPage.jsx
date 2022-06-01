import "draft-js/dist/Draft.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { GifModal, ImgUploadModal, Layout, PostForm, PreviewLinkModal } from "../components";
import {
  clearErrorPost,
  clearTempPreview,
  editPost,
  saveImageToEdit,
  setErrorPost,
  setPreviewData,
} from "../store/actions/posts.action";
import { history } from "../utils/helpers";
import { useError } from "../utils/hooks";

const EditPostPage = () => {
  const { posts, scrapedPost: preview, editId } = useSelector((state) => state.posts);
  const currentPostImg = useSelector((state) => state.posts.currentPost.imgUrl);
  const { isAuthenticated } = useSelector((state) => state?.user);
  // const location = useLocation();
  // const { postId, commentId, replyId } = isAuthenticated && location?.state;
  const postToEdit = editId.type === "post" && posts.filter((post) => post.postId === editId.id);
  const [postTitle, setPostTitle] = useState(postToEdit && postToEdit[0].title);
  const [postText, setPostText] = useState(postToEdit && postToEdit[0].text);
  const [postImgUrl, setPostImgUrl] = useState(postToEdit && postToEdit.imgUrl);
  const [isPreview, setIsPreview] = useState(0);
  const [imgDom, setImgDom] = useState(null);
  const [imgInputModalOpen, setImgInputModalOpen] = useState(false);
  const [gifModalOpen, setGifModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const dispatch = useDispatch();
  const error = useError();
  const isObjectEmpty = useCallback((obj) => {
    for (let prop in obj) {
      return false;
    }
    return true;
  }, []);

  const deletePreview = useCallback(() => {
    setImgDom(null);
    setIsPreview(0);
    dispatch(clearTempPreview());
  }, [dispatch, setImgDom, setIsPreview]);

  useEffect(() => {
    if (isAuthenticated) {
      if (postToEdit?.imgUrl) {
        dispatch(saveImageToEdit(postImgUrl));
      } else if (postToEdit?.isPreview === 1) {
        const postToEditPreview = {
          title: postToEdit.previewTitle,
          image: postToEdit.previewImg,
          description: postToEdit.previewText,
          publisher: postToEdit.previewPub,
          logo: postToEdit.previewPubLogo,
          url: postToEdit.previewUrl,
        };
        dispatch(setPreviewData(postToEditPreview));
      }
    }
  }, [postImgUrl, dispatch, postToEdit, isAuthenticated]);

  useEffect(() => {
    if (!isObjectEmpty(preview)) setIsPreview(1);
  }, [preview]);

  const handleEditTitleInput = useCallback((e) => {
    if (error) dispatch(clearErrorPost());
    setPostTitle(e.currentTarget.value);
  }, []);

  const handleEditText = useCallback((e) => {
    if (error) dispatch(clearErrorPost());
    setPostText(e.currentTarget.textContent);
  }, []);

  const handleEditSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (postTitle && postTitle.length === 0) return dispatch(setErrorPost("emptyTitle"));
      if (error) return;
      console.log(isPreview);
      dispatch(editPost("post", editId.id, postTitle, postText, currentPostImg, isPreview, preview));
      history.push("/feed");

      console.log(postText);
    },
    [dispatch, postToEdit, editId, postTitle, postText, currentPostImg, isPreview, preview]
  );

  const toggleImgUploadModal = useCallback((e) => {
    e.preventDefault();
    setGifModalOpen(false);
    setImgInputModalOpen((prev) => !prev);
  }, []);

  const toggleGifModal = useCallback((e) => {
    e.preventDefault();
    setImgInputModalOpen(false);
    setGifModalOpen((prev) => !prev);
  }, []);

  const toggleLinkModal = useCallback((e) => {
    e.preventDefault();
    setLinkModalOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Layout>
          <div
            className="w-full md:w-10/12 bg-gray-200 dark:bg-black flex flex-col items-center justify-start md:pt-16"
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <div
              className="error h-12 w-10/12 md:w-1/2 xl:w-1/3 whitespace-pre bg-black text-white text-sm text-center py-1 rounded"
              style={{ display: error ? "block" : "none" }}
            >
              {error}
            </div>
            <div className="w-full md:max-w-2xl">
              <PostForm
                postToEdit={postToEdit}
                postTitle={postTitle}
                postText={postText}
                handleEditTitleInput={handleEditTitleInput}
                handleEditText={handleEditText}
                handleEditSubmit={handleEditSubmit}
                toggleGifModal={toggleGifModal}
                toggleLinkModal={toggleLinkModal}
                toggleImgUploadModal={toggleImgUploadModal}
                setIsPreview={setIsPreview}
                isObjectEmpty={isObjectEmpty}
                imgDom={imgDom}
                setImgDom={setImgDom}
                deletePreview={deletePreview}
              />
            </div>
            <ImgUploadModal
              imgInputModalOpen={imgInputModalOpen}
              toggleImgUploadModal={toggleImgUploadModal}
              deletePreview={deletePreview}
            />
            <GifModal gifModalOpen={gifModalOpen} toggleGifModal={toggleGifModal} deletePreview={deletePreview} />
            <PreviewLinkModal linkModalOpen={linkModalOpen} toggleLinkModal={toggleLinkModal} />
          </div>
        </Layout>
      )}
    </>
  );
};

export default EditPostPage;

import "draft-js/dist/Draft.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useLocation } from "react-router-dom";
import { GifModal, ImgUploadModal, Layout, PostForm, PreviewLinkModal } from "../components";
import { editPost, saveImageToEdit, setPreviewData } from "../store/actions/posts.action";
import { history } from "../utils/helpers";

const EditPage = () => {
  const { error, posts, comments, replies } = useSelector((state) => state.posts);
  const isAuthenticated = useSelector((state) => state?.user.isAuthenticated);
  const location = useLocation();
  const { postId, commentId, replyId } = location?.state;
  const [postToEdit] = posts.filter((post) => post.postId === postId);
  const [commentToEdit] = comments.filter((comment) => comment.commentId === commentId);
  const [replyToEdit] = replies.filter((reply) => reply.replyId === replyId);
  const [postTitle, setPostTitle] = useState(postToEdit && postToEdit.title);
  const [postText, setPostText] = useState(postToEdit && postToEdit.text);
  const [postImgUrl, setPostImgUrl] = useState(postToEdit && postToEdit.imgUrl);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [isPreview, setIsPreview] = useState(0);
  const preview = useSelector((state) => state.posts.scrapedPost);
  const [imgInputModalOpen, setImgInputModalOpen] = useState(false);
  const [gifModalOpen, setGifModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const currentPostImg = useSelector((state) => state.posts.currentPost.imgUrl);
  const emptyTitleError = "Votre titre est vide!\n Mettez un mot ou deux...";
  const dispatch = useDispatch();
  const isObjectEmpty = useCallback((obj) => {
    for (let prop in obj) {
      return false;
    }
    return true;
  }, []);

  useEffect(() => {
    if (postToEdit.imgUrl) {
      dispatch(saveImageToEdit(postImgUrl));
    }
    if (postToEdit.isPreview === 1) {
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
  }, [postImgUrl, dispatch, postToEdit]);

  useEffect(() => {
    if (!isObjectEmpty(preview)) setIsPreview(1);
  }, [preview]);

  const handleEditTitleInput = useCallback((e) => {
    setPostTitle(e.currentTarget.value);
    setEmptyTitle(false);
  }, []);

  const handleEditText = useCallback((e) => {
    setPostText(e.currentTarget.textContent);
    setEmptyTitle(false);
  }, []);

  const handleEditSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (postTitle && postTitle.length === 0) return setEmptyTitle(true);
      if (error.length !== 0) return setServerErrorMsg(error);
      setServerErrorMsg("");
      console.log(isPreview);
      if (postToEdit !== undefined) {
        dispatch(editPost("post", postId, postTitle, postText, currentPostImg, isPreview, preview));
        history.push({ pathname: "/feed" });
      }
      if (commentToEdit !== undefined) {
        dispatch(editPost("comment", commentId, postTitle, postText));
        history.push({ pathname: `/comments/${postTitle}` });
      }
      if (replyToEdit !== undefined) {
        dispatch(editPost("reply", replyId, postTitle, postText));
        history.push({ pathname: `/comments/${postTitle}` });
      }
      console.log(postText);
    },
    [dispatch, postToEdit, postId, postTitle, postText, currentPostImg, isPreview, preview]
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
              style={{ display: emptyTitle || error.length !== 0 ? "block" : "none" }}
            >
              {emptyTitle && emptyTitleError}
              {error.length !== 0 && serverErrorMsg}
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
              />
            </div>
            <ImgUploadModal imgInputModalOpen={imgInputModalOpen} toggleImgUploadModal={toggleImgUploadModal} />
            <GifModal gifModalOpen={gifModalOpen} toggleGifModal={toggleGifModal} />
            <PreviewLinkModal linkModalOpen={linkModalOpen} toggleLinkModal={toggleLinkModal} />
          </div>
        </Layout>
      )}
    </>
  );
};

export default EditPage;

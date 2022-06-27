import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GifModal, ImgUploadModal, PostForm, PreviewLinkModal } from ".";
import {
  clearErrorPost,
  clearTempPreview,
  editPost,
  saveImageToEdit,
  setErrorPost,
  setPreviewData,
  toggleEditModal,
} from "../store/actions/posts.action";
import { breakpoint } from "../utils/breakpoints";
import { isObjectEmpty } from "../utils/helpers";
import { useError, useToggle, useWindowSize } from "../utils/hooks";

const EditCommentModal = () => {
  const { posts, scrapedPost: preview, comments, replies, editId, editModalOpen } = useSelector((state) => state.posts);
  const currentPostImg = useSelector((state) => state.posts.currentPost.imgUrl);
  const { isAuthenticated } = useSelector((state) => state?.user);
  const [postToEdit] = posts.filter((post) => post.postId === editId.id);
  const [postTitle, setPostTitle] = useState(postToEdit && postToEdit.title);
  const [postText, setPostText] = useState(postToEdit && postToEdit.text);
  const [postImgUrl, setPostImgUrl] = useState(postToEdit && postToEdit.imgUrl);
  const [isPreview, setIsPreview] = useState(0);
  const [imgDom, setImgDom] = useState(null);
  const [imgInputModalOpen, setImgInputModalOpen] = useState(false);
  const [gifModalOpen, setGifModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [editText, setEditText] = useState("test");
  const dispatch = useDispatch();
  const error = useError();
  const { width } = useWindowSize();

  const setText = useCallback(() => {
    let text = "";
    switch (editId.type) {
      case "post":
        setPostTitle(postToEdit.title);
        setEditText(postToEdit.text);
        break;
      case "comment":
        const comment = comments.filter((comment) => comment.commentId === editId.id);
        text = comment[0].text;
        setEditText(text);
        break;
      case "reply":
        const reply = replies.filter((reply) => reply.replyId === editId.id);
        text = reply[0].text;
        setEditText(text);
        break;
      default:
        return setEditText(text);
    }
  }, [editId.id, editId.type, comments, replies, posts]);

  useEffect(() => {
    setText();
  }, [editId.id, editId.type, setText]);

  useEffect(() => {
    console.log("POST TO EDIT", postToEdit);
    console.log("postToEdit.imgUrl", postToEdit?.imgUrl);
    console.log("postImgUrl", postImgUrl);
    if (postToEdit?.imgUrl) {
      return dispatch(saveImageToEdit(postToEdit.imgUrl));
    } else if (postToEdit?.isPreview === 1) {
      const postToEditPreview = {
        title: postToEdit.previewTitle,
        image: postToEdit.previewImg,
        description: postToEdit.previewText,
        publisher: postToEdit.previewPub,
        logo: postToEdit.previewPubLogo,
        url: postToEdit.previewUrl,
      };
      return dispatch(setPreviewData(postToEditPreview));
    }
  }, [postImgUrl, dispatch, postToEdit, isAuthenticated]);

  useEffect(() => {
    if (!isObjectEmpty(preview)) setIsPreview(1);
  }, [preview]);

  const toggleImgUploadModal = useToggle(imgInputModalOpen, setImgInputModalOpen);
  const toggleGifModal = useToggle(gifModalOpen, setGifModalOpen);
  const toggleLinkModal = useToggle(linkModalOpen, setLinkModalOpen);

  const deletePreview = useCallback(() => {
    setImgDom(null);
    setIsPreview(0);
    dispatch(clearTempPreview());
  }, [dispatch, setImgDom, setIsPreview]);

  const handleEditCommentText = useCallback(
    (e) => {
      if (error) dispatch(clearErrorPost());
      setEditText(e.currentTarget.textContent);
    },
    [dispatch]
  );

  const handleEditCommentSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (error) return;

      switch (editId.type) {
        case "comment":
          dispatch(editPost("comment", editId.id, null, editText));

          break;
        case "reply":
          dispatch(editPost("reply", editId.id, null, editText));

          break;
        default:
          return;
      }
      console.log(editText);
      dispatch(toggleEditModal());
    },
    [dispatch, editId.id, editId.type, editText]
  );

  const handleEditTitleInput = useCallback((e) => {
    if (error) dispatch(clearErrorPost());
    setPostTitle(e.currentTarget.value);
  }, []);

  const handleEditText = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPost());
      }
      setPostText(e.currentTarget.textContent);
    },
    [error]
  );

  const handleEditSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (postTitle && postTitle.length === 0) return dispatch(setErrorPost("emptyTitle"));
      if (error) return;
      console.log(isPreview);
      dispatch(editPost("post", editId.id, postTitle, postText, currentPostImg, isPreview, preview));
      dispatch(toggleEditModal());
      console.log(postText);
    },
    [dispatch, toggleEditModal, postToEdit, editId, postTitle, postText, currentPostImg, isPreview, preview]
  );

  return (
    <div
      className={`min-h-screen h-max overflow-y-auto fixed inset-0 bg-black/60 flex items-start justify-center pt-28 pb-24 transition duration-300 ${
        editModalOpen ? "opacity-100 z-[1000]" : "opacity-0 z-[-1]"
      }`}
    >
      <div className={`${width > breakpoint.md ? "max-w-[600px]" : ""} w-full`}>
        <PostForm
          postToEdit={postToEdit}
          postTitle={postTitle}
          postText={postText}
          editText={editText}
          imgDom={imgDom}
          setImgDom={setImgDom}
          setIsPreview={setIsPreview}
          deletePreview={deletePreview}
          handleEditTitleInput={handleEditTitleInput}
          handleEditText={handleEditText}
          handleEditCommentText={handleEditCommentText}
          handleEditSubmit={handleEditSubmit}
          handleEditCommentSubmit={handleEditCommentSubmit}
          toggleGifModal={toggleGifModal}
          toggleLinkModal={toggleLinkModal}
          toggleImgUploadModal={toggleImgUploadModal}
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
  );
};

export default EditCommentModal;

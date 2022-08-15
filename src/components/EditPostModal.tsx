import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GifModal, ImgUploadModal, PostForm, PreviewLinkModal } from ".";
import {
  clearEditIdAction,
  clearErrorPostAction,
  clearTempPostImgAction,
  clearTempPreviewAction,
  editPostAction,
  saveImageToEditAction,
  setErrorPostAction,
  setPreviewDataAction,
  toggleEditModalAction,
} from "../store/actions/posts.action";
import { clearErrorUserAction } from "../store/actions/user.action";
import { IEdit, IPost, IReply, ScrapedPost } from "../store/types";
import { breakpoint } from "../utils/breakpoints";
import { isObjectEmpty } from "../utils/helpers";
import { useToggle, useWindowSize } from "../utils/hooks";
import Error from "./Error";

const EditPostModal = () => {
  const {
    tempPostImg,
    posts,
    scrapedPost: preview,
    comments,
    editId,
    editModalOpen,
    error,
  } = useSelector((state) => state.posts);
  const [postToEdit]: IPost[] = posts.filter((post) => post.id === editId.id);
  const [postTitle, setPostTitle] = useState(postToEdit && postToEdit.title);
  const [editText, setEditText] = useState<string>("test");
  const [isPreview, setIsPreview] = useState(false);
  const [imgDom, setImgDom] = useState<JSX.Element | null>(null);
  const [imgUploadModalOpen, setImgUploadModalOpen] = useState(false);
  const [gifModalOpen, setGifModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const profilePage = pathname.includes("profile");
  const toggleImgUploadModal = useToggle(imgUploadModalOpen, setImgUploadModalOpen);
  const toggleGifModal = useToggle(gifModalOpen, setGifModalOpen);
  const toggleLinkModal = useToggle(linkModalOpen, setLinkModalOpen);
  const root = window.document.documentElement;
  const editTitleRef = useRef<HTMLInputElement>(null);
  const editTextRef = useRef<HTMLSpanElement>(null);

  const deletePostPreview = useCallback(() => {
    setIsPreview(false);
    dispatch(clearTempPreviewAction());
  }, [dispatch, setIsPreview]);

  const handleEditTitleInput = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPostAction());
      }
      setPostTitle(e.target.innerText);
    },
    [error, dispatch, setPostTitle]
  );

  const handleEditText = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPostAction());
      }
      setEditText(e.target.innerText);
    },
    [dispatch, error, setEditText]
  );

  const handleEditCommentText = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPostAction());
      }
      setEditText(e.target.innerText);
    },
    [dispatch, setEditText, error]
  );

  const handleEditPostSubmit = useCallback(
    (e) => {
      const editedPost: IPost = {
        ...postToEdit,
        title: postTitle,
        text: editText,
        imgUrl: tempPostImg,
        isPreview,
        preview,
      };
      e.preventDefault();
      if (postTitle.length === 0) return dispatch(setErrorPostAction("emptyTitle"));
      if (error) return;
      dispatch(editPostAction("post", editedPost, profilePage ? true : false));
      dispatch(toggleEditModalAction());
      dispatch(clearEditIdAction());
      dispatch(clearTempPostImgAction());
      dispatch(clearTempPreviewAction());
    },
    [dispatch, error, postToEdit, editId, postTitle, editText, tempPostImg, isPreview, preview]
  );

  const handleEditCommentSubmit = useCallback(
    (e) => {
      const edited: IEdit = {
        id: editId.id,
        text: editText,
      };
      e.preventDefault();
      if (error) return;
      switch (editId.type) {
        case "comment":
          if (editText.length === 0) return dispatch(setErrorPostAction("emptyComment"));
          dispatch(editPostAction("comment", edited));
          break;
        case "reply":
          if (editText.length === 0) return dispatch(setErrorPostAction("emptyReply"));
          dispatch(editPostAction("reply", edited));
          break;
        default:
          return;
      }
      console.log(editText);
      dispatch(toggleEditModalAction());
    },
    [error, dispatch, editId.id, editId.type, editText]
  );

  const setText = useCallback(() => {
    if (!editId.type) return;
    let text = "";
    switch (editId.type) {
      case "post":
        setPostTitle(postToEdit?.title);
        if (editTextRef.current) {
          editTextRef.current.innerText = postToEdit.text ? postToEdit.text : ""; // to keep linebreaks/innerText
        }
        break;
      case "comment":
        const comment = comments.filter((comment) => comment.commentId === editId.id)[0];
        text = comment.text;
        if (editTextRef.current) {
          editTextRef.current.innerText = text;
        }
        break;
      case "reply": {
        let reply: IReply;
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].replies?.find((reply) => reply.replyId === editId.id)) {
            reply = comments[i]!.replies!.filter((repl) => repl.replyId === editId.id)[0];
            break;
          }
        }
        text = reply!.text;
        if (editTextRef.current) {
          editTextRef.current.innerText = text;
        }
        break;
      }
      default:
        setEditText(text);
    }
  }, [editId.id, editId.type, comments, posts, setPostTitle, setEditText, postToEdit?.text, postToEdit?.title]); // replies

  const dispatchEditImg = useCallback(() => {
    if (editId.type === "comment" || editId.type === "reply") return;
    if (editId.type === "post") {
      if (postToEdit?.imgUrl!.length > 0) return dispatch(saveImageToEditAction(postToEdit.imgUrl!));
      if (postToEdit?.isPreview) {
        const postToEditPreview: ScrapedPost = {
          title: postToEdit?.preview?.title,
          image: postToEdit.preview?.image,
          text: postToEdit.preview?.text,
          publisher: postToEdit.preview?.publisher,
          logo: postToEdit.preview?.logo,
          url: postToEdit.preview?.url,
        };
        return dispatch(setPreviewDataAction(postToEditPreview));
      }
    }
  }, [dispatch, editId.type, postToEdit?.imgUrl, postToEdit?.isPreview, postToEdit?.preview]);

  useEffect(() => {
    return () => {
      dispatch(clearEditIdAction());
      dispatch(clearTempPreviewAction());
      dispatch(clearTempPostImgAction());
      dispatch(clearErrorPostAction());
      dispatch(clearErrorUserAction());
    };
  }, [dispatch]);

  useEffect(() => {
    setText();
    console.log(postToEdit?.text);
    console.log(editText);
  }, [editId.id, editId.type, postToEdit?.text, editText]);

  useEffect(() => {
    dispatchEditImg();
  }, [editId.id, postToEdit?.imgUrl, postToEdit?.isPreview]);

  useEffect(() => {
    if (editModalOpen) {
      root.classList.add("removeScroll");
    }
    return () => {
      root.classList.remove("removeScroll");
    };
  }, [editModalOpen]);

  useEffect(() => {
    if (!isObjectEmpty(preview)) return setIsPreview(true);
  }, [preview]);

  return (
    <div
      className={`min-h-screen h-max overflow-y-auto fixed inset-0 bg-black/60 flex items-start justify-center transition duration-300 ${
        editModalOpen ? "opacity-100 z-[1000]" : "opacity-0 z-[-1]"
      }`}
    >
      <Error />
      <div className={`${width > breakpoint.md ? "max-w-[600px]" : ""} w-full relative`}>
        <PostForm
          postToEdit={postToEdit}
          postTitle={postTitle}
          editText={editText}
          imgDom={imgDom}
          setImgDom={setImgDom}
          setIsPreview={setIsPreview}
          deletePostPreview={deletePostPreview}
          handleEditTitleInput={handleEditTitleInput}
          handleEditText={handleEditText}
          handleEditCommentText={handleEditCommentText}
          handleEditPostSubmit={handleEditPostSubmit}
          handleEditCommentSubmit={handleEditCommentSubmit}
          toggleGifModal={toggleGifModal}
          toggleLinkModal={toggleLinkModal}
          toggleImgUploadModal={toggleImgUploadModal}
          editTitleRef={editTitleRef}
          editTextRef={editTextRef}
        />
        <ImgUploadModal
          imgUploadModalOpen={imgUploadModalOpen}
          toggleImgUploadModal={toggleImgUploadModal}
          deletePostPreview={deletePostPreview}
        />
        <GifModal gifModalOpen={gifModalOpen} toggleGifModal={toggleGifModal} deletePostPreview={deletePostPreview} />
        <PreviewLinkModal linkModalOpen={linkModalOpen} toggleLinkModal={toggleLinkModal} />
      </div>
    </div>
  );
};

export default EditPostModal;

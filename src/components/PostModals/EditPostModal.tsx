import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GifModal, ImgUploadModal, PostForm, PreviewLinkModal } from "..";
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
} from "../../store/actions/posts.action";
import { clearErrorUserAction } from "../../store/actions/user.action";
import { IEdit, IPost, IReply, ScrapedPost } from "../../store/types";
import { breakpoint } from "../../utils/breakpoints";
import { isObjectEmpty } from "../../utils/helpers";
import { useToggle, useWindowSize } from "../../utils/hooks";
import Error from "../Layout/Error";

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
  const [editTitle, setEditTitle] = useState(postToEdit ? postToEdit.title : "");
  const [editText, setEditText] = useState<string>(postToEdit?.text ? postToEdit.text : "");
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
  const body = window.document.body;
  const editTitleRef = useRef<HTMLInputElement>(null);
  const editTextRef = useRef<HTMLSpanElement>(null);

  const deletePostPreview = useCallback(() => {
    setIsPreview(false);
    dispatch(clearTempPreviewAction());
  }, [dispatch, setIsPreview]);

  const handleEditTitleInput = useCallback(() => {
    if (error) {
      dispatch(clearErrorPostAction());
    }
    setEditTitle(editTitleRef?.current?.value!);
  }, [error, dispatch, setEditTitle, editTitleRef]);

  const handleEditText = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPostAction());
      }
      if (editTextRef.current) {
        editTextRef.current.innerText = e.target.innerText;
      }
    },
    [dispatch, error, editTextRef]
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
        title: editTitle,
        text: editTextRef?.current?.innerText ? editTextRef?.current?.innerText : "",
        imgUrl: tempPostImg,
        isPreview,
        preview,
      };
      e.preventDefault();
      if (editTitle.length === 0) return dispatch(setErrorPostAction("emptyTitle"));
      if (error) return;
      dispatch(editPostAction("post", editedPost, profilePage ? true : false));
      dispatch(toggleEditModalAction());
      dispatch(clearEditIdAction());
      dispatch(clearTempPostImgAction());
      dispatch(clearTempPreviewAction());
    },
    [dispatch, error, postToEdit, editTitle, tempPostImg, isPreview, preview, profilePage]
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
      dispatch(toggleEditModalAction());
    },
    [error, dispatch, editId.id, editId.type, editText]
  );

  const setText = useCallback(() => {
    if (!editId.type) return;
    switch (editId.type) {
      case "post":
        setEditTitle(postToEdit.title);
        if (editTextRef.current) {
          editTextRef.current.innerText = postToEdit?.text || ""; // to keep linebreaks/innerText
          // setEditText(editTextRef.current.innerText);
        }
        break;
      case "comment":
        const comment = comments.filter((comment) => comment.commentId === editId.id)[0];
        let text = comment.text;
        if (editTextRef.current) {
          editTextRef.current.innerText = text;
          // setEditText(text);
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
        let text = reply!.text;
        if (editTextRef.current) {
          editTextRef.current.innerText = text;
          // setEditText(text);
        }
        break;
      }
      default:
        setEditText("");
    }
  }, [editId.id, editId.type, editTextRef, comments, setEditTitle, setEditText, postToEdit?.text, postToEdit?.title]);

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
  }, [setText, editId.id, editId.type, postToEdit?.text]);

  useEffect(() => {
    dispatchEditImg();
  }, [dispatchEditImg, editId.id, postToEdit?.imgUrl, postToEdit?.isPreview]);

  useEffect(() => {
    if (!isObjectEmpty(preview)) return setIsPreview(true);
  }, [preview]);

  return (
    <div
      className={`transition duration-300 ${
        editModalOpen
          ? "min-h-screen h-max overflow-y-auto fixed inset-0 opacity-100 z-[1000] flex bg-black/60 items-start justify-center"
          : "opacity-0 z-[-1] hidden"
      }`}
    >
      <Error />
      <div className={`${width > breakpoint.md ? "max-w-[600px]" : ""} w-full relative`}>
        <PostForm
          postToEdit={postToEdit}
          editTitle={editTitle}
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

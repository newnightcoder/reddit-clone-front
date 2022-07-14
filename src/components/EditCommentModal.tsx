import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { IEdit, IPost, IReply, IScrapedPreview } from "../store/types";
import { breakpoint } from "../utils/breakpoints";
import { isObjectEmpty } from "../utils/helpers";
import { useError, useToggle, useWindowSize } from "../utils/hooks";

const EditCommentModal = () => {
  const { tempPostImg, posts, scrapedPost: preview, comments, editId, editModalOpen } = useSelector((state) => state.posts);
  const [postToEdit]: IPost[] = posts.filter((post) => post.id === editId.id);
  const [postTitle, setPostTitle] = useState(postToEdit && postToEdit.title);
  const [postText, setPostText] = useState(postToEdit && postToEdit.text);
  const [isPreview, setIsPreview] = useState(false);
  const [imgDom, setImgDom] = useState<JSX.Element | null>(null);
  const [imgUploadModalOpen, setImgUploadModalOpen] = useState(false);
  const [gifModalOpen, setGifModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [editText, setEditText] = useState("test");
  const dispatch = useDispatch();
  const error = useError();
  const { width } = useWindowSize();

  const toggleImgUploadModal = useToggle(imgUploadModalOpen, setImgUploadModalOpen);
  const toggleGifModal = useToggle(gifModalOpen, setGifModalOpen);
  const toggleLinkModal = useToggle(linkModalOpen, setLinkModalOpen);

  useEffect(() => {
    return () => {
      dispatch(clearEditIdAction());
      dispatch(clearTempPreviewAction());
      dispatch(clearTempPostImgAction());
      dispatch(clearErrorPostAction());
      dispatch(clearErrorUserAction());
    };
  }, [dispatch]);

  const setText = useCallback(() => {
    if (!editId.type) return;
    let text = "";
    switch (editId.type) {
      case "post":
        setPostTitle(postToEdit.title);
        setEditText(postToEdit.text ? postToEdit.text : "");
        break;
      case "comment":
        const comment = comments.filter((comment) => comment.commentId === editId.id)[0];
        text = comment.text;
        setEditText(text);
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
        setEditText(text);
        break;
      }
      default:
        return setEditText(text);
    }
  }, [editId.id, editId.type, comments, posts, setPostTitle, setEditText]); // replies

  useEffect(() => {
    setText();
  }, [editId.id, editId.type, setText]);

  const handleEditImg = useCallback(() => {
    if (postToEdit?.imgUrl) return dispatch(saveImageToEditAction(postToEdit.imgUrl));
    if (postToEdit?.isPreview) {
      const postToEditPreview: IScrapedPreview = {
        title: postToEdit?.preview?.title,
        image: postToEdit.preview?.image,
        text: postToEdit.preview?.text,
        publisher: postToEdit.preview?.publisher,
        logo: postToEdit.preview?.logo,
        url: postToEdit.preview?.url,
      };
      return dispatch(setPreviewDataAction(postToEditPreview));
    }
  }, [dispatch, postToEdit?.imgUrl, postToEdit?.isPreview]);

  useEffect(() => {
    console.log("POST TO EDIT", postToEdit);
    console.log("postToEdit.imgUrl", postToEdit?.imgUrl);
    handleEditImg();
  }, [postToEdit?.imgUrl, postToEdit?.isPreview]);

  useEffect(() => {
    if (!isObjectEmpty(preview)) setIsPreview(true);
  }, [preview]);

  const deletePreview = useCallback(() => {
    setImgDom(null);
    setIsPreview(false);
    dispatch(clearTempPreviewAction());
  }, [dispatch, setImgDom, setIsPreview]);

  const handleEditCommentText = useCallback(
    (e) => {
      if (error) dispatch(clearErrorPostAction());
      setEditText(e.currentTarget.textContent);
    },
    [dispatch]
  );

  const handleEditTitleInput = useCallback((e) => {
    if (error) dispatch(clearErrorPostAction());
    setPostTitle(e.currentTarget.value);
  }, []);

  const handleEditText = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPostAction());
      }
      setPostText(e.currentTarget.textContent);
    },
    [error]
  );

  const handleEditCommentSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (error) return;
      const edited: IEdit = {
        id: editId.id,
        text: editText,
      };

      switch (editId.type) {
        case "comment":
          dispatch(editPostAction("comment", edited));

          break;
        case "reply":
          dispatch(editPostAction("reply", edited));

          break;
        default:
          return;
      }
      console.log(editText);
      dispatch(toggleEditModalAction());
    },
    [dispatch, editId.id, editId.type, editText]
  );

  const handleEditPostSubmit = useCallback(
    (e) => {
      const editedPost: IPost = {
        ...postToEdit,
        title: postTitle,
        text: postText,
        imgUrl: tempPostImg,
        isPreview,
        preview,
      };
      e.preventDefault();
      if (postTitle && postTitle.length === 0) return dispatch(setErrorPostAction("emptyTitle"));
      if (error) return;
      console.log(isPreview);
      dispatch(editPostAction("post", editedPost));
      dispatch(toggleEditModalAction());
      dispatch(clearEditIdAction());
      dispatch(clearTempPostImgAction());
      dispatch(clearTempPreviewAction());
      // console.log(postText);
    },
    [dispatch, postToEdit, editId, postTitle, postText, tempPostImg, isPreview, preview]
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
          // postText={postText}
          editText={editText}
          imgDom={imgDom}
          setImgDom={setImgDom}
          setIsPreview={setIsPreview}
          deletePreview={deletePreview}
          handleEditTitleInput={handleEditTitleInput}
          handleEditText={handleEditText}
          handleEditCommentText={handleEditCommentText}
          handleEditPostSubmit={handleEditPostSubmit}
          handleEditCommentSubmit={handleEditCommentSubmit}
          toggleGifModal={toggleGifModal}
          toggleLinkModal={toggleLinkModal}
          toggleImgUploadModal={toggleImgUploadModal}
        />
      </div>
      <ImgUploadModal
        imgUploadModalOpen={imgUploadModalOpen}
        toggleImgUploadModal={toggleImgUploadModal}
        deletePreview={deletePreview}
      />
      <GifModal gifModalOpen={gifModalOpen} toggleGifModal={toggleGifModal} deletePreview={deletePreview} />
      <PreviewLinkModal linkModalOpen={linkModalOpen} toggleLinkModal={toggleLinkModal} />
    </div>
  );
};

export default EditCommentModal;

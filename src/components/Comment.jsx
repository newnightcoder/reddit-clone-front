import { PaperAirplaneIcon, XIcon } from "@heroicons/react/solid";
import { convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import {
  ChatRight,
  HandThumbsUp,
  HandThumbsUpFill,
  Image,
  ThreeDotsVertical,
  TypeBold,
  TypeItalic,
  TypeUnderline,
  Youtube,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Reply } from ".";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { createReply, getReplies } from "../store/actions/posts.action";
import { likePost } from "../store/actions/user.action";
import { createDate, formatTimestamp } from "../utils/formatTime";
import Options from "./Options";

const Comment = ({ comment }) => {
  const { fk_userId_comment, picUrl, username, text, date, commentId, likesCount } = comment;
  const likes = useSelector((state) => state?.posts.likes);
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [replyOpen, setReplyOpen] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const replyText = convertToRaw(editorState.getCurrentContent()).blocks[0].text;
  const [optionsOpen, setOptionsOpen] = useState(false);
  const userId = useSelector((state) => state?.user.id);
  const replies = useSelector((state) => state?.posts.replies);
  const [openModal, setOpenModal] = useState(false);
  const emptyComErrorMsg = "Votre commentaire est vide!";
  const [emptyComError, setEmptyComError] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const serverError = useSelector((state) => state?.user.error);
  const sameUserComment = [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReplies());
    dispatch(getReplies(commentId));
  }, [dispatch]);

  useEffect(() => {
    setLikesNumber(likesCount);
  }, [likesCount]);

  useEffect(() => {
    likes.map((like) => {
      if (like.fk_userId_like === userId && like.fk_commentId_like === commentId) {
        return sameUserComment.push(like.fk_commentId_like);
      }
      return sameUserComment;
    });
    sameUserComment.forEach((id) => {
      if (id === commentId) {
        setLike(true);
      }
    });
  }, [commentId, likes, userId]);

  const toggleOptions = () => {
    return setOptionsOpen((optionsOpen) => !optionsOpen);
  };

  const toggleDeleteModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const toggleReply = () => {
    return setReplyOpen((replyOpen) => !replyOpen);
  };

  const handleLike = (commentId) => {
    setLike((like) => !like);
    switch (like) {
      case false:
        setLikesNumber(likesNumber + 1);
        break;
      case true:
        setLikesNumber(likesNumber - 1);
        break;
      default:
        break;
    }
    dispatch(likePost("comment", userId, commentId, like));
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyText.length === 0) {
      setEmptyComError(true);
      return;
    }
    if (serverError.length !== 0) {
      setServerErrorMsg(serverError);
    }
    dispatch(createReply(userId, commentId, replyText, createDate()));
    setEditorState(() => EditorState.createEmpty());
    setReplyOpen(false);
    setTimeout(() => {
      dispatch(getReplies(commentId));
    }, 1000);
  };

  return (
    <>
      <div
        className="comment-container relative h-max w-full flex-col items-center justify-center bg-white transition-all duration-300 px-2 pt-2 "
        style={{ marginBottom: replyOpen && "5px" }}
      >
        <div className="top w-full flex items-center justify-center pb-1 border-b">
          <div className="left-column h-full w-2/12 flex justify-center">
            <div
              className="avatar-container w-11 h-11 rounded-full border border-gray-300"
              style={
                picUrl
                  ? { background: `url(${picUrl}) no-repeat center/cover` }
                  : {
                      background: `url(${picPlaceholder}) no-repeat center/cover`,
                    }
              }
            ></div>
          </div>
          <div className="right-column  h-full w-10/12 flex flex-col items-center justify-center">
            <div className="username-title-container h-12 w-full flex flex-col items-start justify-center pl-1 pr-3">
              <div className="username-date w-full flex items-center justify-between gap-2">
                <div className="capitalize">
                  <span className="text-xs">@</span>
                  {username}
                </div>
                <div className="text-xs italic">{formatTimestamp(date, "post")}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text w-full text-left px-3 py-2 text-sm">{text}</div>
        <div className="bottom w-full flex items-center justify-end px-2 py-2 border-t">
          <div className="icons-container w-max flex items-center justify-end gap-4 text-xs">
            <button className="outline-none w-max flex items-center justify-center gap-2" onClick={toggleReply}>
              <ChatRight size={14} />
              <span>Répondre</span>
            </button>
            <div className="w-max flex items-center justify-center">
              <button className="outline-none" onClick={() => handleLike(commentId)}>
                {like ? <HandThumbsUpFill size={14} /> : <HandThumbsUp size={14} className="font-weight-bold" />}
              </button>
              <span className="w-4 text-center">{likesNumber}</span>
            </div>
            <button className="w-max flex items-center justify-center gap-1" onClick={toggleOptions}>
              <ThreeDotsVertical />
            </button>
          </div>
        </div>{" "}
        <Options
          commentUserId={fk_userId_comment}
          commentId={commentId}
          optionsOpen={optionsOpen}
          toggleOptions={toggleOptions}
          toggleDeleteModal={toggleDeleteModal}
        />
      </div>
      <div className="w-11/12" style={{ display: replyOpen ? "flex" : "none" }}>
        <form
          className="h-max w-full flex flex-col items-center justify-center bg-white mb-2"
          method="post"
          onSubmit={handleReplySubmit}
        >
          <div className="h-max w-full flex flex-col items-center justify-start border border-gray-600 hover:border-gray-500 rounded">
            <div className="editor-container w-full overflow-y-auto h-32 bg-gray-100 hover:bg-white active:bg-white focus:bg-white rounded-t pl-3 pr-2 pt-3 pb-2">
              <Editor
                editorState={editorState}
                onChange={(e) => {
                  setEditorState(e);
                  setEmptyComError("");
                }}
                placeholder="Tapez votre réponse..."
              />
            </div>
            <div className="h-12 w-full flex items-center justify-between rounded-b bg-gray-200 pr-2">
              <div className="w-1/2 h-full flex items-center justify-center">
                <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                  <TypeBold />
                </button>
                <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                  <TypeItalic />
                </button>
                <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                  <TypeUnderline />
                </button>
                <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                  <Image />
                </button>
                <button className="h-8 w-8 bg-transparent ouline-none flex items-center justify-center">
                  <Youtube />
                </button>
              </div>
              <div className="w-max flex items-center justify-end gap-1">
                <button
                  className="h-6 w-6 rounded-full flex items-center justify-center text-white bg-gray-500"
                  disabled={false}
                  onClick={() => setReplyOpen(false)}
                >
                  <XIcon className="h-4 w-4 text-white" />
                </button>
                <button
                  className="h-6 flex items-center justify-center gap-1 text-white bg-gray-500 rounded-3xl disabled:opacity-50 px-2"
                  disabled={false}
                  type="submit"
                >
                  <span className="text-xs capitalize">commenter</span>
                  <PaperAirplaneIcon className="h-4 w-4 text-white transform rotate-45 -translate-y-px" />
                </button>
              </div>{" "}
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gray-100 flex flex-col items-end justify-center gap-2 py-2">
        {replies &&
          replies.map((reply) => {
            if (reply.fk_commentId === commentId) {
              return <Reply key={reply.replyId} reply={reply} toggleOptions={toggleOptions} optionsOpen={optionsOpen} />;
            }
          })}
      </div>
    </>
  );
};

export default Comment;

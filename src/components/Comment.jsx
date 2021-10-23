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
import { getReplies } from "../store/actions/posts.action";
import { createReply } from "../store/actions/user.action";
import { formatTimestamp } from "./formatTime";

const Comment = ({ comment }) => {
  const { picUrl, username, text, date, commentId } = comment;
  const likes = useSelector((state) => state.posts.likes);
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState("");
  const [replyOpen, setReplyOpen] = useState(false);
  const [emptyComError, setEmptyComError] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const replyText = convertToRaw(editorState.getCurrentContent()).blocks[0].text;
  const emptyComErrorMsg = "Votre commentaire est vide!";
  const serverError = useSelector((state) => state.user.error);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const userId = useSelector((state) => state.user.id);
  const replies = useSelector((state) => state.posts.replies);
  const dispatch = useDispatch();

  const toggleReply = () => {
    return setReplyOpen((replyOpen) => !replyOpen);
  };

  useEffect(() => {
    dispatch(getReplies());
  }, [dispatch]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyText.length === 0) {
      setEmptyComError(true);
      return;
    }
    if (serverError.length !== 0) {
      setServerErrorMsg(serverError);
    }
    dispatch(createReply(userId, commentId, replyText, date));
    setEditorState(() => EditorState.createEmpty());
    setReplyOpen(false);
    setTimeout(() => {
      dispatch(getReplies(commentId));
    }, 1000);
  };

  return (
    <>
      <div
        className="comment-container h-max w-full flex-col items-center justify-center bg-white border-b border-gray-100 transition-all duration-300 px-2 pt-2 "
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
                <div className="text-xs italic">{formatTimestamp(date)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text w-full text-left px-3 py-2 text-sm">{text}</div>
        <div className="bottom w-full flex items-center justify-end px-2 py-2 border-t">
          <div className="icons-container w-max flex items-center justify-end gap-4 text-xs">
            <button
              className="outline-none w-max flex items-center justify-center gap-1"
              onClick={toggleReply}
            >
              <ChatRight size={14} />
              <span>{}</span> <span>Répondre</span>
            </button>
            <div className="w-max flex items-center justify-center gap-1">
              <button
                className="outline-none"
                onClick={() => {
                  // handleLike();
                  // dispatch(likePost(userId, postId, like));
                }}
              >
                {!like ? <HandThumbsUp size={14} /> : <HandThumbsUpFill size={14} />}
              </button>
              <span>{likesNumber}</span>
            </div>
            <div className="w-max flex items-center justify-center gap-1">
              <ThreeDotsVertical />
            </div>
          </div>
        </div>
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
              <div className="w-2/3 h-full flex items-center justify-start">
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
              <div className="w-full flex items-center justify-end gap-3">
                <button
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white bg-gray-500"
                  disabled={false}
                  onClick={() => setReplyOpen(false)}
                >
                  <XIcon className="h-4 w-4 text-white" />
                </button>
                <button
                  className="h-8 flex items-center justify-center gap-1 text-white bg-gray-500 rounded-3xl disabled:opacity-50 px-4"
                  disabled={false}
                  type="submit"
                >
                  <span className="text-sm capitalize">commenter</span>
                  <PaperAirplaneIcon className="h-4 w-4 text-white transform rotate-45 -translate-y-px" />
                </button>
              </div>{" "}
            </div>
          </div>
        </form>
      </div>
      {replies &&
        replies.map((reply) => {
          return <Reply key={reply.replyId} reply={reply} />;
        })}
    </>
  );
};

export default Comment;

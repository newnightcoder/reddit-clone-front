import { ChatAltIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import {
  Image,
  TypeBold,
  TypeItalic,
  TypeUnderline,
  Youtube,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Post } from ".";
import logo from "../assets/logo.svg";
import { getComments } from "../store/actions/posts.action";
import { createComment } from "../store/actions/user.action";
import { Comment } from "./index";

const CommentPage = () => {
  const posts = useSelector((state) => state.posts.posts);
  const comments = useSelector((state) => state.posts.comments);
  const postId = useSelector((state) => state.user.currentComment.postId);
  const post = posts.find((post) => post.postId === postId);
  const userId = useSelector((state) => state.user.id);
  const serverError = useSelector((state) => state.user.error);
  const emptyComErrorMsg = "Votre commentaire est vide!";
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const [emptyComError, setEmptyComError] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const text = convertToRaw(editorState.getCurrentContent()).blocks[0].text;
  const dispatch = useDispatch();

  const time = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
  };
  const date = `${time.year}-${time.month}-${time.day}-${time.hour}-${time.minute}-${time.second}`;

  const getRelatedComments = (postId) => {
    const relatedComments = [];
    comments
      .sort((a, b) => {
        if (a.commentId > b.commentId) return -1;
        else return 1;
      })
      .map((comment) => {
        if (comment.fk_postId_comment === postId) {
          return relatedComments.push(comment);
        }
      });
    return relatedComments;
  };

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  useEffect(() => {
    setServerErrorMsg(serverError);
  }, [serverError]);

  const commentsToDisplay = getRelatedComments(postId);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (text.length === 0) {
      setEmptyComError(true);
      return;
    }
    if (serverError.length !== 0) {
      setServerErrorMsg(serverError);
    }
    dispatch(createComment(userId, postId, text, date));
    setTimeout(() => {
      dispatch(getComments());
    }, 1000);

    setEditorState(() => EditorState.createEmpty());
  };

  return (
    <div
      className="page-container min-h-screen w-screen flex flex-col items-center justify-start relative pb-8 overflow-x-hidden"
      style={{ background: `url(${logo}) no-repeat fixed center/250%` }}
    >
      <div
        className="error h-8 w-10/12 md:w-1/2 lg:w-1/3 whitespace-pre bg-black text-white text-sm text-center py-1 px-2 rounded overflow-hidden overflow-ellipsis"
        style={{ visibility: serverError || emptyComError ? "visible" : "hidden" }}
      >
        {text.length === 0 ? emptyComErrorMsg : serverErrorMsg}
      </div>
      <div className="w-full md:w-1/2 xl:w-1/3 flex flex-col items-center justify-center relative">
        <div className="w-full flex items-center justify-center">
          <Post post={post} />
        </div>

        <form
          className="h-max w-11/12 flex flex-col items-center justify-center pt-2"
          method="post"
          onSubmit={handleCommentSubmit}
        >
          <div className="h-max w-full flex flex-col items-center justify-start border border-gray-300 hover:border-gray-500 rounded">
            <div className="editor-container w-full overflow-y-auto h-32 bg-gray-100 hover:bg-white active:bg-white focus:bg-white rounded-t pl-3 pr-2 pt-3 pb-2">
              <Editor
                editorState={editorState}
                onChange={(e) => {
                  setEditorState(e);
                  setEmptyComError("");
                }}
                placeholder="Votre commentaire..."
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
              <div className="w-full flex items-center justify-end gap-1">
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
        <div className="comments-container w-full flex flex-col items-center justify-center ">
          {commentsToDisplay.length !== 0 ? (
            <div className="w-11/12 flex flex-col items-center justify-center mt-3 border border-red-300 rounded">
              <span
                className="w-full uppercase italic rounded-tl rounded-tr text-white px-2 py-1"
                style={{ backgroundColor: "#ef5350" }}
              >
                commentaires
              </span>
              <div className="w-full bg-gray-100 flex flex-col items-center justify-center  rounded-bl rounded-br  border-red-300 py-2">
                {commentsToDisplay.map((comment) => {
                  return <Comment key={comment.commentId} comment={comment} />;
                })}
              </div>
            </div>
          ) : (
            <>
              <span
                className="w-11/12 uppercase italic rounded-tl rounded-tr text-white text-center px-2 py-1"
                style={{ backgroundColor: "#ef5350" }}
              >
                pas encore de commentaire
              </span>
              <div className="w-11/12 bg-gray-100 flex flex-col items-center justify-center gap-2 rounded-bl rounded-br border border-red-300">
                <ChatAltIcon className="h-20 text-gray-200" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentPage;

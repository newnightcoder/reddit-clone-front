import { ChatAltIcon } from "@heroicons/react/solid";
import "draft-js/dist/Draft.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment, CommentForm, Layout, Post } from "../components";
import { getComments, getPosts, getReplies } from "../store/actions/posts.action";
import { createComment } from "../store/actions/user.action";
import { createDate } from "../utils/helpers/formatTime";
import { useLanguage } from "../utils/hooks";

const CommentPage = ({ toggleDeleteModal, openModal }) => {
  const userLanguage = useLanguage();
  const { posts, comments } = useSelector((state) => state.posts);
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);
  const postId = useSelector((state) => state.user.currentComment.postId);
  const post = posts.find((post) => post.postId === postId);
  const { id: userId, error: serverError } = useSelector((state) => state.user);
  const emptyComErrorMsg = userLanguage?.commentPage.error;
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const [emptyComError, setEmptyComError] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();

  const getRelatedComments = useCallback((postId) => {
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
  }, []);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
    dispatch(getReplies());
  }, [dispatch, postId]);

  useEffect(() => {
    setCommentsToDisplay(getRelatedComments(postId));
  }, [comments]);

  useEffect(() => {
    setServerErrorMsg(serverError);
  }, [serverError]);

  const handleChange = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const handleCommentSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (commentText.length === 0) {
      setEmptyComError(true);
      return;
    }
    if (serverError.length !== 0) {
      setServerErrorMsg(serverError);
    }
    dispatch(createComment(userId, postId, commentText, createDate()));
    setTimeout(() => {
      dispatch(getComments());
    }, 1000);
  }, []);

  return (
    <Layout>
      <div
        className="page-container min-h-screen w-full flex items-start justify-center relative space-x-8 py-8 overflow-x-hidden"
        // style={{ background: "#dae0e6" }}
      >
        <div className="w-10/12 md:w-1/2 max-w-3xl flex flex-col items-center justify-center relative">
          <div className="w-full flex items-center justify-center">
            <Post post={post} />
          </div>
          <div
            className="error h-8 w-10/12 md:w-1/2 lg:w-1/3 whitespace-pre bg-black text-white text-sm text-center py-1 px-2 rounded overflow-hidden overflow-ellipsis"
            style={{ visibility: serverError || emptyComError ? "visible" : "hidden" }}
          >
            {commentText.length === 0 ? emptyComErrorMsg : serverErrorMsg}
          </div>
          <CommentForm handleChange={handleChange} handleCommentSubmit={handleCommentSubmit} />
          <div className="comments-container w-full flex flex-col items-center justify-center ">
            {commentsToDisplay.length === 0 ? (
              <>
                <span
                  className="w-11/12 uppercase italic rounded-tl rounded-tr text-white text-center px-2 py-1 mt-3"
                  style={{ backgroundColor: "#ef5350" }}
                >
                  {userLanguage.commentPage.noComments}{" "}
                </span>
                <div className="w-11/12 bg-gray-100 flex flex-col items-center justify-center gap-2 rounded-bl rounded-br border border-red-300">
                  <ChatAltIcon className="h-20 text-gray-200" />
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center mt-3 border border-red-300 rounded">
                <span
                  className="w-full uppercase italic rounded-tl rounded-tr text-white px-2 py-1"
                  style={{ backgroundColor: "#ef5350" }}
                >
                  {userLanguage.commentPage.comments}
                </span>
                <div className="w-full bg-gray-100 flex flex-col items-center justify-center  rounded-bl rounded-br  border-red-300 py-2">
                  {commentsToDisplay.map((comment) => {
                    return (
                      <Comment
                        key={comment.commentId}
                        comment={comment}
                        toggleDeleteModal={toggleDeleteModal}
                        openModal={openModal}
                        postId={postId}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommentPage;

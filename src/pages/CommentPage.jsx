import { ChatAltIcon, ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import "draft-js/dist/Draft.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Comment, CommentForm, EditCommentModal, Layout, Post } from "../components";
import {
  clearErrorPost,
  createComment,
  getComments,
  getLikes,
  getPostById,
  getReplies,
  setErrorPost,
} from "../store/actions/posts.action";
import { history } from "../utils/helpers";
import { createDate } from "../utils/helpers/formatTime";
import { useError, useLanguage } from "../utils/hooks";

const CommentPage = ({ toggleDeleteModal, openModal }) => {
  const { comments, editModalOpen } = useSelector((state) => state.posts);
  const { id: userId, error: serverError, liked, isAuthenticated } = useSelector((state) => state.user);
  const postId = useSelector((state) => state?.user.currentComment.postId);
  const { currentPostComments: post, lastReplyAdded: replyId, currentCommentsCount: count } = useSelector((state) => state.posts);
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);
  const [commentText, setCommentText] = useState("");
  const container = useRef();
  const commentTextRef = useRef();
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const error = useError();
  const containerSize = container?.current?.getBoundingClientRect();

  const getRelatedComments = useCallback(
    (postId) => {
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
    },
    [comments, postId]
  );

  useEffect(() => {
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch, count]);

  useEffect(() => {
    dispatch(getReplies());
  }, [dispatch, replyId]);

  useEffect(() => {
    dispatch(getLikes());
  }, [liked]);

  useEffect(() => {
    setCommentsToDisplay(getRelatedComments(postId));
  }, [comments]);

  const handleChange = useCallback((e) => {
    console.log();
    if (error) dispatch(clearErrorPost());
    setCommentText(e.target.value);
  }, []);

  const handleCommentSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (commentText.length === 0) return dispatch(setErrorPost("emptyComment"));
      if (error) return;
      dispatch(createComment(userId, postId, commentText, createDate()));
      commentTextRef.current.value = "";
      setCommentText("");
    },
    [dispatch, commentText, serverError, commentTextRef, setCommentText]
  );

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Layout>
          <div
            ref={container}
            className="w-full flex flex-col items-center justify-start relative mb-16 md:mb-0 md:pb-8 overflow-x-hidden"
          >
            <div className=" back-container h-16 w-full relative z-50 flex items-center justify-center space-x-2">
              <div
                style={{ width: containerSize?.width }}
                className="fixed bg-gray-200 dark:bg-black text-black dark:text-white h-16 w-full flex items-center justify-start pl-8 space-x-2"
              >
                <button
                  onClick={() => history.push("/feed")}
                  className="w-max flex items-center justify-center space-x-2 outline-none font-bold"
                >
                  <ChevronDoubleLeftIcon className="h-4" />
                  <span>Back to feed</span>
                </button>
              </div>
            </div>
            <div className="w-full md:w-11/12 max-w-3xl flex flex-col items-center justify-center space-y-2 relative ">
              <div className="w-full flex items-center justify-center">
                {post?.hasOwnProperty("title") && <Post post={post} />}
              </div>
              <div
                className="error h-6 w-max px-3 flex items-center justify-center whitespace-pre bg-black text-white text-sm text-center py-1  transform translate-y-6 rounded overflow-hidden overflow-ellipsis"
                style={{ visibility: error ? "visible" : "hidden" }}
              >
                {error}
              </div>
              <CommentForm
                handleChange={handleChange}
                handleCommentSubmit={handleCommentSubmit}
                commentTextRef={commentTextRef}
              />
              <div className="comments-container w-full flex flex-col items-center justify-center">
                {commentsToDisplay.length === 0 ? (
                  <>
                    <span className="w-full uppercase italic md:rounded-tl md:rounded-tr text-white text-center px-2 py-1 mt-2 bg-[#ef5350]">
                      {userLanguage.commentPage.noComments}
                    </span>
                    <div className="w-full bg-gray-100 flex flex-col items-center justify-center gap-2 md:rounded-bl md:rounded-br border border-red-300">
                      <ChatAltIcon className="h-20 text-gray-200" />
                    </div>
                  </>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center mt-3 md:border border-red-300 md:rounded">
                    <span className="w-full uppercase italic md:rounded-tl md:rounded-tr text-white px-2 py-1 bg-[#ef5350]">
                      {userLanguage.commentPage.comments}
                    </span>
                    <div className="w-full bg-gray-100 flex flex-col items-center justify-center  md:rounded-bl md:rounded-br pt-2 pb-4 md:pb-2">
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
            <EditCommentModal />
          </div>
        </Layout>
      )}
    </>
  );
};

export default CommentPage;

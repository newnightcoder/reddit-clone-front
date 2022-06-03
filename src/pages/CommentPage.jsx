import { ChatAltIcon, ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import "draft-js/dist/Draft.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { PulseLoader } from "react-spinners";
import { Comment, CommentForm, EditCommentModal, Layout, Post } from "../components";
import { clearErrorPost, createComment, getComments, getLikes, getReplies, setErrorPost } from "../store/actions/posts.action";
import { history } from "../utils/helpers";
import { createDate } from "../utils/helpers/formatTime";
import { useError, useLanguage } from "../utils/hooks";

const CommentPage = ({ toggleDeleteModal, openModal }) => {
  const { comments } = useSelector((state) => state.posts);
  const {
    currentComment: { postId },
    id: userId,
    error: serverError,
    liked,
    isAuthenticated,
  } = useSelector((state) => state.user);
  // const {  } = useSelector((state) => state?.user);
  const { posts, lastReplyAdded: replyId, currentCommentsCount: count } = useSelector((state) => state.posts);
  const post = posts.filter((post) => post.postId === postId);
  const [commentsToDisplay, setCommentsToDisplay] = useState(null);
  const [commentText, setCommentText] = useState("");
  const container = useRef();
  const commentTextRef = useRef();
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const error = useError();
  const [backLinkWidth, setBackLinkWidth] = useState(null);

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
    // console.log("i'm setting the width only once babe");
    setBackLinkContainerWidth(`${container?.current?.getBoundingClientRect().width}px`);
  }, []);

  const getRelatedComments = useCallback(
    (postId) => {
      const relatedComments = comments
        ?.sort((a, b) => {
          if (a.commentId > b.commentId) return -1;
          else return 1;
        })
        .map((comment) => {
          if (comment.fk_postId_comment === postId) {
            return comment;
          }
        })
        .filter((comment) => comment !== undefined);
      return relatedComments;
    },
    [comments, postId]
  );

  useEffect(() => {
    setTimeout(() => {
      setCommentsToDisplay(getRelatedComments(postId));
    }, 900);
  }, [comments]);

  const setBackLinkContainerWidth = useCallback(() => {
    console.log(`${container?.current?.getBoundingClientRect().width}px`);
    setBackLinkWidth(`${container?.current?.getBoundingClientRect().width}px`);
  }, [container, setBackLinkWidth]);

  useEffect(() => {
    window.addEventListener("resize", setBackLinkContainerWidth);
    return () => {
      window.removeEventListener("resize", setBackLinkContainerWidth);
    };
  }, [container]);

  const handleChange = useCallback((e) => {
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
            <div
              style={{ width: `${backLinkWidth}` }}
              className={`back-container h-16 fixed top-16 z-50 flex items-center justify-center space-x-2`}
            >
              <div className="w-full h-full transition-color duration-500 bg-gray-200 dark:bg-black text-black dark:text-white flex items-center justify-start pl-8 space-x-2">
                <button
                  onClick={() => history.push("/feed")}
                  className="w-max flex items-center justify-center space-x-2 outline-none font-bold"
                >
                  <ChevronDoubleLeftIcon className="h-4" />
                  <span className="underline">{userLanguage.commentPage.backLink}</span>
                </button>
              </div>
            </div>
            <div className="w-full md:w-11/12 max-w-3xl flex flex-col items-center justify-center space-y-2 relative mt-[4.25rem]">
              <div className="w-full flex items-center justify-center">
                <Post post={post[0]} />
              </div>
              <div
                className={`error ${
                  error ? "visible" : "invisible"
                } h-6 w-max px-3 flex items-center justify-center whitespace-pre transition-color duration-500 bg-black dark:bg-white text-white dark:text-black text-sm text-center py-1  transform translate-y-6 rounded overflow-hidden overflow-ellipsis`}
              >
                {error}
              </div>
              <CommentForm
                handleChange={handleChange}
                handleCommentSubmit={handleCommentSubmit}
                commentTextRef={commentTextRef}
              />
              <div className="comments-container w-full flex flex-col items-center justify-center">
                {!commentsToDisplay ? (
                  <div className="w-full flex flex-col items-center justify-center mt-3 md:border border-red-300 md:rounded">
                    <span className="w-full flex items-center justify-center space-x-1 uppercase italic rounded text-center text-white px-2 py-1 bg-[#ef5350]">
                      <span>{userLanguage.commentPage.comments}</span>
                      <div className="translate-y-0.5">
                        <PulseLoader size={6} color={"#ffffff"} />
                      </div>
                    </span>
                    <div className="h-20 w-full animate-pulse transition-color duration-500 bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center gap-2 md:rounded-bl md:rounded-br border border-red-300"></div>
                  </div>
                ) : commentsToDisplay.length > 0 ? (
                  <div className="w-full h-max flex flex-col items-center justify-center mt-3 md:rounded">
                    <span className="w-full uppercase italic rounded text-white text-center px-2 py-1 bg-[#ef5350]">
                      {userLanguage.commentPage.comments}
                    </span>
                    <div className="w-full h-max flex flex-col transition-color duration-500 bg-gray-200 dark:bg-black md:rounded-bl md:rounded-br pt-1 pb-4 md:pb-2">
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
                ) : (
                  commentsToDisplay.length === 0 && (
                    <div className="w-full flex flex-col items-center justify-center mt-3 md:border-1 border-red-300 dark:border-red-300 md:rounded">
                      <span className="w-full uppercase italic rounded text-white text-center px-2 py-1 bg-[#ef5350]">
                        {userLanguage.commentPage.noComments}
                      </span>
                      <div className="w-full flex flex-col items-center justify-center space-y-2 transition-color duration-500 bg-gray-200 dark:bg-gray-800 md:rounded-bl md:rounded-br md:border-[1px] md:border-[#ef5350] dark:border-[#ef5350]">
                        <ChatAltIcon className="h-20 transition-color duration-500 text-gray-300 dark:text-gray-700" />
                      </div>
                    </div>
                  )
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

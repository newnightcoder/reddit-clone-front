import { ChatAltIcon, ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import "draft-js/dist/Draft.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Comment, CommentForm, Layout, Post } from "../components";
import { createComment, getComments, getLikes, getPostById, getReplies } from "../store/actions/posts.action";
import { history } from "../utils/helpers";
import { createDate } from "../utils/helpers/formatTime";
import { useError, useLanguage } from "../utils/hooks";

const CommentPage = ({ toggleDeleteModal, openModal }) => {
  const userLanguage = useLanguage();
  const { posts, comments } = useSelector((state) => state.posts);
  const { id: userId, error: serverError, liked, isAuthenticated } = useSelector((state) => state.user);
  const postId = useSelector((state) => state.user.currentComment.postId);
  const { currentPostComments: post } = useSelector((state) => state.posts);
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);
  const emptyComErrorMsg = userLanguage?.commentPage.error;
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const [emptyComError, setEmptyComError] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  // const { height, width } = useWindowSize();
  const container = useRef();
  const commentTextRef = useRef();
  const error = useError();
  const containerSize = container?.current?.getBoundingClientRect();

  useEffect(() => {
    "dispatching getPostById";
    dispatch(getPostById(postId));
  }, [dispatch]);

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
    dispatch(getComments());
    dispatch(getReplies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLikes());
  }, [liked]);

  useEffect(() => {
    setCommentsToDisplay(getRelatedComments(postId));
  }, [comments]);

  const handleChange = useCallback((e) => {
    console.log();
    setCommentText(e.target.value);
    setEmptyComError(false);
  }, []);

  const handleCommentSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (commentText.length === 0) {
        setEmptyComError(true);
        return;
      }
      if (serverError.length !== 0) {
        setServerErrorMsg(serverError);
      }
      dispatch(createComment(userId, postId, commentText, createDate()));
      commentTextRef.current.value = "";
      setCommentText("");
      setTimeout(() => {
        dispatch(getComments());
      }, 1000);
    },
    [dispatch, commentText, serverError]
  );

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Layout>
          <div
            ref={container}
            className="min-h-screen w-full flex flex-col items-center justify-start relative pb-8 overflow-x-hidden"
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
                {post.hasOwnProperty("title") && <Post post={post} />}
              </div>
              <div
                className="error h-6 w-max px-3 flex items-center justify-center whitespace-pre bg-black text-white text-sm text-center py-1  transform translate-y-6 rounded overflow-hidden overflow-ellipsis"
                style={{ visibility: error || emptyComError ? "visible" : "hidden" }}
              >
                {error}
              </div>
              <CommentForm
                handleChange={handleChange}
                handleCommentSubmit={handleCommentSubmit}
                commentTextRef={commentTextRef}
              />
              <div className="comments-container w-full flex flex-col items-center justify-center ">
                {commentsToDisplay.length === 0 ? (
                  <>
                    <span
                      className="w-full uppercase italic md:rounded-tl md:rounded-tr text-white text-center px-2 py-1 mt-2"
                      style={{ backgroundColor: "#ef5350" }}
                    >
                      {userLanguage.commentPage.noComments}
                    </span>
                    <div className="w-full bg-gray-100 flex flex-col items-center justify-center gap-2 md:rounded-bl md:rounded-br border border-red-300">
                      <ChatAltIcon className="h-20 text-gray-200" />
                    </div>
                  </>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center mt-3 md:border border-red-300 md:rounded">
                    <span
                      className="w-full uppercase italic md:rounded-tl md:rounded-tr text-white px-2 py-1"
                      style={{ backgroundColor: "#ef5350" }}
                    >
                      {userLanguage.commentPage.comments}
                    </span>
                    <div className="w-full bg-gray-100 flex flex-col items-center justify-center  md:rounded-bl md:rounded-br  py-2">
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
      )}
    </>
  );
};

export default CommentPage;

import { ChatAltIcon, ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import "draft-js/dist/Draft.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { PulseLoader } from "react-spinners";
import { Comment, CommentForm, EditCommentModal, Layout, Post } from "../components";
import { clearErrorPost, createComment, getComments, getLikes, getReplies, setErrorPost } from "../store/actions/posts.action";
import { history } from "../utils/helpers";
import { createDate } from "../utils/helpers/formatTime";
import { useContainerSize, useError, useLanguage } from "../utils/hooks";

const CommentPage = ({ toggleDeleteModal, openModal }) => {
  const { comments } = useSelector((state) => state?.posts);
  const {
    currentComment: { postId },
    id: userId,
    liked,
    isAuthenticated,
  } = useSelector((state) => state.user);
  const { posts, lastReplyAdded: replyId, currentCommentsCount: count, error: errorType } = useSelector((state) => state.posts);
  const post = posts.filter((post) => post.postId === postId);
  const [commentsToDisplay, setCommentsToDisplay] = useState(null);
  const [commentText, setCommentText] = useState("");
  const commentTextRef = useRef();
  const commentContainer = useRef();
  const size = useContainerSize(commentContainer);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const error = useError();

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch, count]);

  useEffect(() => {
    dispatch(getReplies());
  }, [dispatch, replyId]);

  useEffect(() => {
    dispatch(getLikes());
  }, [liked]);

  const getRelatedComments = useCallback(
    (postId) => {
      const copy = comments && [...comments];
      const relatedComments = copy
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

  const handleChange = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPost());
      }
      setCommentText(e.target.value);
    },
    [error]
  );

  const handleCommentSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (commentText.length === 0) return dispatch(setErrorPost("emptyComment"));
      if (error) return;
      dispatch(createComment(userId, postId, commentText, createDate()));
      commentTextRef.current.value = "";
      setCommentText("");
    },
    [dispatch, commentText, commentTextRef, setCommentText]
  );
  return (
    <>
      {!isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Layout>
          <div
            ref={commentContainer}
            className="w-full flex flex-col items-center justify-start relative mb-16 md:mb-0 pb-8 overflow-x-hidden"
          >
            {error && errorType !== "emptyComment" && errorType !== "emptyReply" && (
              <div className="fixed top-16  z-[100] h-min inset-x-0 w-full py-4 px-2 bg-black dark:bg-white text-center text-white dark:text-black text-sm z-10 whitespace-pre rounded">
                {error}
              </div>
            )}
            <div
              style={{ width: `${size}` }}
              className={`backBtn-container h-16 fixed top-16 z-50 flex items-center justify-center space-x-2`}
            >
              <div className="w-full h-full transition-color duration-500 bg-gray-200 dark:bg-black text-black dark:text-white flex items-center justify-start pl-4 space-x-2">
                <button
                  onClick={() => history.push("/feed")}
                  className={`w-max flex items-center justify-center space-x-2 outline-none font-bold transition duration-300 ${
                    size ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <ChevronDoubleLeftIcon className="h-4" />
                  <span className="underline">{userLanguage.commentPage.backLink}</span>
                </button>
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center space-y-2 relative mt-[4.25rem]">
              <div className="w-full flex items-center justify-center">
                <Post post={post[0]} />
              </div>

              <CommentForm
                handleChange={handleChange}
                handleCommentSubmit={handleCommentSubmit}
                commentTextRef={commentTextRef}
              />
              <div className="comments-container w-full  flex flex-col items-center justify-center">
                {!commentsToDisplay ? (
                  <div className="w-full flex flex-col items-center justify-center mt-3 md:border border-red-300 md:rounded">
                    <span className="w-full flex items-center justify-center space-x-1 uppercase italic md:rounded text-center text-white px-2 py-1 bg-[#ef5350]">
                      <span>{userLanguage.commentPage.comments}</span>
                      <div className="translate-y-0.5">
                        <PulseLoader size={6} color={"#ffffff"} />
                      </div>
                    </span>
                    <div className="h-20 w-full animate-pulse transition-color duration-500 bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center gap-2 md:rounded-bl md:rounded-br border border-red-300"></div>
                  </div>
                ) : commentsToDisplay.length > 0 ? (
                  <div className="w-full h-max flex flex-col items-center justify-center mt-3 md:rounded">
                    <span className="w-full uppercase italic md:rounded text-white text-center px-2 py-1 bg-[#ef5350]">
                      {userLanguage.commentPage.comments}
                    </span>
                    <div className="w-full h-max flex flex-col transition-color duration-500 bg-gray-200 dark:bg-gray-800 md:rounded-bl md:rounded-br pt-1 pb-4 md:pb-2">
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
                    <div className="w-full flex flex-col items-center justify-center mt-3">
                      <span className="w-full uppercase italic md:rounded text-white text-center px-2 py-1 bg-[#ef5350]">
                        {userLanguage.commentPage.noComments}
                      </span>
                      <div className="w-full flex flex-col items-center justify-center space-y-2 transition-color duration-500 bg-gray-200 dark:bg-gray-800">
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

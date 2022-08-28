import { ChatAltIcon, ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { Comment, CommentForm, Layout, Post } from "../components";
import {
  clearErrorPostAction,
  createCommentAction,
  getCommentsAction,
  getLikesAction,
  resetCommentsAction,
  resetRepliesAction,
  setErrorPostAction,
} from "../store/actions/posts.action";
import { IComment } from "../store/types";
import { history } from "../utils/helpers";
import { createDate } from "../utils/helpers/formatTime";
import { useContainerSize, useError, useLanguage } from "../utils/hooks";

const CommentPage = () => {
  const { comments, posts, error: errorType } = useSelector((state) => state?.posts);
  const {
    currentComment: { postId },
    id: userId,
    liked,
    isAuthenticated,
  } = useSelector((state) => state.user);
  const post = posts.filter((post) => post.id === postId);
  const [commentsToDisplay, setCommentsToDisplay] = useState<IComment[] | null>(null);
  const [commentText, setCommentText] = useState("");
  const commentTextRef = useRef<HTMLTextAreaElement | null>(null);
  const commentContainer = useRef<HTMLDivElement | null>(null);
  const size = useContainerSize(commentContainer);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const error = useError();

  // clear comments/replies on unmount
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(resetCommentsAction());
      dispatch(resetRepliesAction());
    };
  }, []);

  // clear comments/replies on refresh
  useEffect(() => {
    window.addEventListener("beforeonload", () => dispatch(resetRepliesAction()));
    return () => {
      window.removeEventListener("beforeonload", () => dispatch(resetRepliesAction()));
    };
  }, []);

  useEffect(() => {
    dispatch(getCommentsAction(postId!));
  }, [dispatch, postId]);

  useEffect(() => {
    dispatch(getLikesAction());
  }, [liked]);

  useEffect(() => {
    setCommentsToDisplay(comments);
  }, [comments]);

  const handleChange = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPostAction());
      }
      setCommentText(e.target.value);
    },
    [error, dispatch, setCommentText]
  );

  const handleCommentSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (commentText.length === 0) return dispatch(setErrorPostAction("emptyComment"));
      if (error) return;
      const date = createDate();
      const newComment: IComment = {
        fk_userId_comment: userId!,
        fk_postId_comment: postId!,
        text: commentText,
        date,
      };
      dispatch(createCommentAction(newComment));
      if (commentTextRef.current) {
        commentTextRef.current.value = "";
      }
      setCommentText("");
    },
    [dispatch, userId, postId, commentText, commentTextRef, error, setCommentText]
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
              <div className="w-full h-full transition-color duration-500 bg-gray-200 dark:bg-black text-black dark:text-white flex items-center justify-start pl-4 md:pl-1 space-x-2">
                <button
                  onClick={() => history.push("/feed")}
                  className={`w-max flex items-center justify-center space-x-2 outline-none font-bold transition duration-300 ${
                    size ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <ChevronDoubleLeftIcon className="h-5" />
                  <span className="underline whitespace-nowrap">{userLanguage.commentPage.backLink}</span>
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
                  <div className="w-full flex flex-col items-center justify-center mt-3 md:rounded">
                    <span className="w-full flex items-center justify-center space-x-1 uppercase italic md:rounded text-center text-white px-2 py-1 bg-[#ef5350]">
                      <span>{userLanguage.commentPage.comments}</span>
                      <div className="translate-y-0.5">
                        <PulseLoader size={6} color={"#ffffff"} />
                      </div>
                    </span>
                    <div className="h-20 w-full animate-pulse transition-color duration-500 bg-gray-200 dark:bg-black flex flex-col items-center justify-center space-y-2 md:rounded-bl md:rounded-br"></div>
                  </div>
                ) : commentsToDisplay.length > 0 ? (
                  <div className="w-full h-max flex flex-col items-center justify-center mt-3 md:rounded">
                    <span className="w-full uppercase italic md:rounded text-white text-center px-2 py-1 bg-[#ef5350]">
                      {userLanguage.commentPage.comments}
                    </span>
                    <div className="w-full h-max flex flex-col space-y-1 transition-color duration-500 bg-gray-200 dark:bg-black md:rounded-bl md:rounded-br pt-1 pb-4 md:pb-2">
                      {commentsToDisplay.map((comment) => {
                        return <Comment key={comment.date} comment={comment} postId={postId!} />;
                      })}
                    </div>
                  </div>
                ) : (
                  commentsToDisplay.length === 0 && (
                    <div className="w-full flex flex-col items-center justify-center mt-3">
                      <span className="w-full uppercase italic md:rounded text-white text-center px-2 py-1 bg-[#ef5350]">
                        {userLanguage.commentPage.noComments}
                      </span>
                      <div className="w-full flex flex-col items-center justify-center space-y-2 transition-color duration-500 bg-gray-200 dark:bg-black">
                        <ChatAltIcon className="h-20 transition-color duration-500 text-gray-300 dark:text-gray-700" />
                      </div>
                    </div>
                  )
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

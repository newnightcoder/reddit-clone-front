import "draft-js/dist/Draft.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatRight, HandThumbsUp, HandThumbsUpFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal, Options, Reply, ReplyForm } from "..";
import { picPlaceholder } from "../../assets";
import { clearErrorPostAction, createReplyAction, deletePostAction, setErrorPostAction } from "../../store/actions/posts.action";
import { likePostAction } from "../../store/actions/user.action";
import { IComment, IReply } from "../../store/types";
import { createDate, formatTimestamp } from "../../utils/helpers/formatTime";
import { useError, useLanguage, useToggle } from "../../utils/hooks";

const Comment = ({ comment, postId }: { comment: IComment; postId: number }) => {
  const { fk_userId_comment: authorId, picUrl, username, text, date, commentId, likesCount, replyCount, replies } = comment;
  const { likes } = useSelector((state) => state?.posts);
  const { id: myId, role, error: serverError } = useSelector((state) => state?.user);
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const sameUserComment: number[] = [];
  const replyTextRef = useRef<HTMLTextAreaElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const userLanguage = useLanguage();
  const error = useError();
  const [commentRefNumber, setcommentRefNumber] = useState<number | null>(null);
  const toggleOptions = useToggle(optionsOpen, setOptionsOpen);
  const toggleDeleteModal = useToggle(openDeleteModal, setOpenDeleteModal);
  const toggleReply = useToggle(replyOpen, setReplyOpen);

  useEffect(() => {
    setLikesNumber(likesCount);
  }, [likesCount]);

  useEffect(() => {
    likes?.map((like) => {
      if (like.userId === myId && like.commentId === commentId) {
        return sameUserComment.push(like.commentId!);
      }
      return sameUserComment;
    });
    sameUserComment.forEach((id) => {
      if (id === commentId) {
        setLike(true);
      }
    });
  }, [commentId, likes, myId]);

  const handleLike = useCallback(
    (commentId) => {
      setLike((like) => !like);
      switch (like) {
        case false:
          return setLikesNumber(likesNumber! + 1);
        case true:
          return setLikesNumber(likesNumber! - 1);
        default:
          break;
      }
      dispatch(likePostAction("comment", myId!, commentId, like));
    },
    [dispatch, like, likesNumber, myId]
  );

  const handleChange = useCallback(
    (e) => {
      if (error) {
        dispatch(clearErrorPostAction());
      }

      setReplyText(e.target.value);
    },
    [error, dispatch, setReplyText]
  );

  const handleReplySubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (replyText.length === 0) return dispatch(setErrorPostAction("emptyReply"));
      if (error) return;
      if (e.target.parentElement.id == commentId) {
        setcommentRefNumber(commentId!);
      }
      const date: string = createDate();
      const newReply: IReply = {
        fk_userId_reply: myId!,
        fk_commentId: commentId!,
        text: replyText,
        date,
      };
      dispatch(createReplyAction(newReply));
      setReplyOpen(false);
      if (replyTextRef.current) {
        replyTextRef.current.value = "";
      }
      setReplyText("");
    },
    [commentId, commentRef, dispatch, replyText, serverError, myId]
  );

  const handleDeletePost = useCallback(() => {
    dispatch(deletePostAction(commentId!, "comment", postId));
    setIsDeleted(true);
    setTimeout(() => {
      setpostIsGone(true);
    }, 500);
  }, [commentId, dispatch, postId]);

  return (
    <div
      id={commentId?.toString()}
      ref={commentRef}
      className="flex flex-col items-center justify-center space-y-1 w-full rounded pb-2"
    >
      <div
        className="comment-container rounded relative h-max w-full flex-col items-center justify-center text-gray-900 dark:text-gray-300 transition duration-500 bg-white dark:bg-gray-900 px-2 py-1"
        style={{
          marginBottom: replyOpen ? "5px" : "",
          transform: isDeleted ? "scale(0)" : "",
          display: postIsGone ? "none" : "",
        }}
      >
        {openDeleteModal && (myId === authorId || role === "admin") ? (
          <DeleteModal
            toggleDeleteModal={toggleDeleteModal}
            origin={"comment"}
            postIdComment={postId!}
            handleDeletePost={handleDeletePost}
          />
        ) : null}
        <div className="top w-full flex items-center justify-center pl-1 py-1 transition-color duration-500 border-b dark:border-gray-800">
          <div className="left-column h-full w-max flex justify-center">
            <div
              className="avatar-container w-11 h-11 rounded-full border transition-color duration-500 border-gray-300 dark:border-gray-600"
              style={
                picUrl
                  ? { background: `url(${picUrl}) no-repeat center/cover` }
                  : {
                      background: `url(${picPlaceholder}) no-repeat center/cover`,
                    }
              }
            ></div>
          </div>
          <div className="right-column h-full w-full flex flex-col items-center justify-center pl-2 pr-4">
            <div className="username-title-container h-12 w-full flex flex-col items-start justify-center">
              <div className="username-date w-full flex items-center justify-between gap-2">
                <div className="capitalize">
                  <span className="text-xs">@</span>
                  {username}
                </div>
                <div className="text-xs italic">{formatTimestamp(date, "post", "")}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text w-full text-left px-3 py-2 text-sm break-words whitespace-pre-line">{text}</div>
        <div className="bottom w-full flex items-center justify-end px-2 py-2">
          <div className="icons-container w-max flex items-center justify-end gap-4 text-xs">
            <button className="outline-none w-max flex items-center justify-center gap-2" onClick={toggleReply}>
              <ChatRight size={14} />
              <span className="capitalize">
                {replyCount} {userLanguage.commentPage.comment.reply}
              </span>
            </button>
            <button className="outline-none w-max flex items-center justify-center" onClick={() => handleLike(commentId)}>
              <span className="">
                {like ? <HandThumbsUpFill size={14} /> : <HandThumbsUp size={14} className="font-weight-bold" />}
              </span>
              <span className="w-4 text-center">{likesNumber}</span>
            </button>
            <button className="w-max flex items-center justify-center gap-1" onClick={toggleOptions}>
              <ThreeDotsVertical />
            </button>
          </div>
        </div>
        <Options
          commentUserId={authorId}
          commentId={commentId}
          optionsOpen={optionsOpen}
          toggleOptions={toggleOptions}
          toggleDeleteModal={toggleDeleteModal}
        />
      </div>

      <ReplyForm
        handleReplySubmit={handleReplySubmit}
        replyOpen={replyOpen}
        setReplyOpen={setReplyOpen}
        handleChange={handleChange}
        replyTextRef={replyTextRef}
        commentId={commentId!}
        commentRefNumber={commentRefNumber!}
      />
      <div className="w-full transition-color duration-500 bg-gray-200 dark:bg-black flex flex-col items-end justify-center space-y-2">
        {replies &&
          replies.map((reply) => {
            return <Reply key={reply.replyId} reply={reply} />;
          })}
      </div>
    </div>
  );
};

export default Comment;

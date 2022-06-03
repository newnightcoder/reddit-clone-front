import "draft-js/dist/Draft.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChatRight, HandThumbsUp, HandThumbsUpFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal, Options, Reply, ReplyForm } from ".";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { createReply, deletePost, getReplies } from "../store/actions/posts.action";
import { likePost } from "../store/actions/user.action";
import { createDate, formatTimestamp } from "../utils/helpers/formatTime";
import { useLanguage } from "../utils/hooks";

const Comment = ({ comment, postId }) => {
  const { fk_userId_comment, picUrl, username, text, date, commentId, likesCount } = comment;
  const { likes, replies } = useSelector((state) => state?.posts);
  const { id: userId, role, error: serverError } = useSelector((state) => state?.user);
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [replyNumber, setReplyNumber] = useState(0);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const [emptyComError, setEmptyComError] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const sameUserComment = [];
  const replyTextRef = useRef();
  const dispatch = useDispatch();
  const userLanguage = useLanguage();

  useEffect(() => {
    const replyCount = replies
      .map((reply) => {
        if (reply.fk_commentId === commentId) {
          return reply.replyId;
        }
      })
      .filter((value) => value !== undefined);
    setReplyNumber(replyCount.length);
  }, [replies]);

  useEffect(() => {
    setLikesNumber(likesCount);
  }, [likesCount]);

  useEffect(() => {
    likes?.map((like) => {
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
  }, [commentId, likes, userId, sameUserComment]);

  const toggleOptions = useCallback(() => {
    return setOptionsOpen((optionsOpen) => !optionsOpen);
  }, [optionsOpen]);

  const toggleDeleteModal = useCallback(() => {
    setOpenModal((openModal) => !openModal);
  }, [openModal]);

  const toggleReply = useCallback(() => {
    return setReplyOpen((replyOpen) => !replyOpen);
  }, [replyOpen]);

  const handleLike = useCallback(
    (commentId) => {
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
    },
    [dispatch, like, likesNumber, userId]
  );

  const handleChange = useCallback((e) => {
    setReplyText(e.target.value);
  }, []);

  const handleReplySubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (replyText.length === 0) {
        setEmptyComError(true);
        return;
      }
      if (serverError.length !== 0) {
        setServerErrorMsg(serverError);
      }
      dispatch(createReply(userId, commentId, replyText, createDate()));
      setReplyOpen(false);
      replyTextRef.current.value = "";
      setTimeout(() => {
        dispatch(getReplies());
      }, 1000);
    },
    [commentId, dispatch, replyText, serverError, userId]
  );

  const handleDeletePost = useCallback(() => {
    dispatch(deletePost(commentId, "comment", postId));
    setIsDeleted(true);
    setTimeout(() => {
      setpostIsGone(true);
    }, 500);
  }, [commentId, dispatch, postId]);

  return (
    <div className="flex flex-col items-center justify-center space-y-1 w-full rounded">
      <div
        className="comment-container rounded relative h-max w-full flex-col items-center justify-center text-gray-900 dark:text-gray-300 transition duration-500 bg-white dark:bg-gray-800 px-2 py-1"
        style={{ marginBottom: replyOpen && "5px", transform: isDeleted && "scale(0)", display: postIsGone && "none" }}
      >
        {(openModal && userId === fk_userId_comment) || (openModal && role === "admin") ? (
          <DeleteModal
            toggleDeleteModal={toggleDeleteModal}
            handleDeletePost={handleDeletePost}
            origin={"comment"}
            postIdComment={postId}
          />
        ) : null}
        <div className="top w-full flex items-center justify-center pl-1 py-1 transition-color duration-500 border-b dark:border-gray-700">
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
                <div className="text-xs italic">{formatTimestamp(date, "post")}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text w-full text-left px-3 py-2 text-sm break-words">{text}</div>
        <div className="bottom w-full flex items-center justify-end px-2 py-2">
          <div className="icons-container w-max flex items-center justify-end gap-4 text-xs">
            <button className="outline-none w-max flex items-center justify-center gap-2" onClick={toggleReply}>
              <ChatRight size={14} />
              <span className="capitalize">
                {replyNumber} {userLanguage.commentPage.comment.reply}
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
          commentUserId={fk_userId_comment}
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
        replyText={replyText}
        handleChange={handleChange}
        replyTextRef={replyTextRef}
      />
      <div className="w-full transition-color duration-500 bg-gray-200 dark:bg-black flex flex-col items-end justify-center space-y-2">
        {replies &&
          replies
            .sort((a, b) => {
              if (a.replyId > b.replyId) {
                return -1;
              } else return 1;
            })
            .map((reply) => {
              if (reply.fk_commentId === commentId) {
                return <Reply key={reply.replyId} reply={reply} toggleOptions={toggleOptions} optionsOpen={optionsOpen} />;
              } else return null;
            })}
      </div>
    </div>
  );
};

export default Comment;

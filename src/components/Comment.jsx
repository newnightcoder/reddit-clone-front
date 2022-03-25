import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import { ChatRight, HandThumbsUp, HandThumbsUpFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal, Options, Reply, ReplyForm } from ".";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { createReply, deletePost, getReplies } from "../store/actions/posts.action";
import { likePost } from "../store/actions/user.action";
import { createDate, formatTimestamp } from "../utils/helpers/formatTime";

const Comment = ({ comment, postId }) => {
  const { fk_userId_comment, picUrl, username, text, date, commentId, likesCount } = comment;
  const likes = useSelector((state) => state?.posts.likes);
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [optionsOpen, setOptionsOpen] = useState(false);
  const userId = useSelector((state) => state?.user.id);
  const role = useSelector((state) => state?.user.role);
  const replies = useSelector((state) => state?.posts.replies);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const emptyComErrorMsg = "Votre commentaire est vide!";
  const [emptyComError, setEmptyComError] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const serverError = useSelector((state) => state?.user.error);
  const sameUserComment = [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReplies());
    dispatch(getReplies(commentId));
  }, [dispatch]);

  useEffect(() => {
    setLikesNumber(likesCount);
  }, [likesCount]);

  useEffect(() => {
    likes.map((like) => {
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
  }, [commentId, likes, userId]);

  const toggleOptions = () => {
    return setOptionsOpen((optionsOpen) => !optionsOpen);
  };

  const toggleDeleteModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const toggleReply = () => {
    return setReplyOpen((replyOpen) => !replyOpen);
  };

  const handleLike = (commentId) => {
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
  };

  const handleChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = async (e) => {
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
    setTimeout(() => {
      dispatch(getReplies(commentId));
    }, 1000);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(commentId, "comment", postId));
    setIsDeleted(true);
    setTimeout(() => {
      setpostIsGone(true);
    }, 500);
  };

  return (
    <>
      <div
        className="comment-container relative h-max w-full flex-col items-center justify-center bg-white transition-all duration-300 px-2 pt-2 "
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
                <div className="text-xs italic">{formatTimestamp(date, "post")}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text w-full text-left px-3 py-2 text-sm">{text}</div>
        <div className="bottom w-full flex items-center justify-end px-2 py-2 border-t">
          <div className="icons-container w-max flex items-center justify-end gap-4 text-xs">
            <button className="outline-none w-max flex items-center justify-center gap-2" onClick={toggleReply}>
              <ChatRight size={14} />
              <span>Répondre</span>
            </button>
            <div className="w-max flex items-center justify-center">
              <button className="outline-none" onClick={() => handleLike(commentId)}>
                {like ? <HandThumbsUpFill size={14} /> : <HandThumbsUp size={14} className="font-weight-bold" />}
              </button>
              <span className="w-4 text-center">{likesNumber}</span>
            </div>
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
      />
      <div className="w-full bg-gray-100 flex flex-col items-end justify-center gap-2 py-2">
        {replies &&
          replies.map((reply) => {
            if (reply.fk_commentId === commentId) {
              return <Reply key={reply.replyId} reply={reply} toggleOptions={toggleOptions} optionsOpen={optionsOpen} />;
            }
          })}
      </div>
    </>
  );
};

export default Comment;

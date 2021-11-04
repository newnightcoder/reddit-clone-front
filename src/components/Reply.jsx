import React, { useEffect, useState } from "react";
import { ChatRight, HandThumbsUp, HandThumbsUpFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal } from ".";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { deletePost } from "../store/actions/posts.action";
import { likePost } from "../store/actions/user.action";
import { formatTimestamp } from "../utils/formatTime";
import Options from "./Options";

const Reply = ({ reply }) => {
  const { replyId, fk_userId_reply, text, date, username, picUrl, likesCount } = reply;
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const likes = useSelector((state) => state?.posts.likes);
  const [replyOpen, setReplyOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const userId = useSelector((state) => state?.user.id);
  const role = useSelector((state) => state?.user.role);
  const sameUserReply = [];
  const dispatch = useDispatch();

  useEffect(() => {
    setLikesNumber(likesCount);
  }, [likesCount]);

  useEffect(() => {
    likes.map((like) => {
      if (like.fk_userId_like === userId && like.fk_replyId_like === replyId) {
        return sameUserReply.push(like.fk_replyId_like);
      }
      return sameUserReply;
    });
    sameUserReply.forEach((id) => {
      if (id === replyId) {
        setLike(true);
      }
    });
  }, [replyId, likes, userId]);

  const toggleOptions = () => {
    return setOptionsOpen((optionsOpen) => !optionsOpen);
  };

  const toggleDeleteModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const toggleReply = () => {
    return setReplyOpen((replyOpen) => !replyOpen);
  };

  const handleLike = (replyId) => {
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
    dispatch(likePost("reply", userId, replyId, like));
  };

  const handleDeletePost = () => {
    dispatch(deletePost(replyId, "reply"));
    setIsDeleted(true);
    setTimeout(() => {
      setpostIsGone(true);
    }, 500);
  };

  return (
    <div
      className="reply-container relative h-max w-11/12 flex-col items-center justify-center bg-white border border-gray-200 rounded-md transition-all duration-300 px-2 pt-2 "
      style={{ marginBottom: replyOpen && "5px", transform: isDeleted && "scale(0)", display: postIsGone && "none" }}
    >
      {(openModal && userId === fk_userId_reply) || (openModal && role === "admin") ? (
        <DeleteModal toggleDeleteModal={toggleDeleteModal} handleDeletePost={handleDeletePost} origin={"reply"} />
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
          <button className="outline-none w-max flex items-center justify-center gap-1" onClick={toggleReply}>
            <ChatRight size={14} />
            <span>{}</span> <span>Répondre</span>
          </button>
          <div className="w-max flex items-center justify-center">
            <button className="outline-none" onClick={() => handleLike(replyId)}>
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
        replyUserId={fk_userId_reply}
        replyId={replyId}
        optionsOpen={optionsOpen}
        toggleOptions={toggleOptions}
        toggleDeleteModal={toggleDeleteModal}
      />
    </div>
  );
};

export default Reply;

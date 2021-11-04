import React, { useEffect, useState } from "react";
import { ChatRight, HandThumbsUp, HandThumbsUpFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal } from ".";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { deletePost } from "../store/actions/posts.action";
import { getUserProfile, likePost, toComment } from "../store/actions/user.action";
import { formatTimestamp } from "../utils/formatTime";
import history from "../utils/history";
import Options from "./Options";

const Post = ({ post }) => {
  const { title, postId, text, date, username, picUrl, likesCount, commentCount, fk_userId_post } = post;
  const sameUser = [];
  const userId = useSelector((state) => state.user.id);
  const role = useSelector((state) => state?.user.role);
  const likes = useSelector((state) => state.posts.likes);
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [commentsNumber, setcommentsNumber] = useState(commentCount);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLikesNumber(likesCount);
    setcommentsNumber(commentCount);
  }, [likesCount, commentCount]);

  useEffect(() => {
    likes.map((like) => {
      if (like.fk_userId_like === userId && like.fk_postId_like === postId) {
        return sameUser.push(like.fk_postId_like);
      }
      return sameUser;
    });
    sameUser.forEach((id) => {
      if (id === postId) {
        setLike(true);
      }
    });
  }, [postId, likes, userId]);

  const handleLike = (postId) => {
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
    dispatch(likePost("post", userId, postId, like));
  };

  const toggleOptions = () => {
    return setOptionsOpen((optionsOpen) => !optionsOpen);
  };

  const toggleDeleteModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(postId, null, "post"));
    setIsDeleted(true);
    setTimeout(() => {
      setpostIsGone(true);
    }, 500);
  };

  const toCommentPage = () => {
    dispatch(toComment(postId));
    setTimeout(() => {
      history.push(`/comments/${post.title}`);
    }, 100);
  };

  const toProfilePage = () => {
    if (userId !== fk_userId_post) {
      dispatch(getUserProfile(fk_userId_post));
    } else dispatch(getUserProfile(userId));
    setTimeout(() => {
      history.push(`/profile/${username}`);
    }, 100);
  };

  return (
    <div
      className="post-container h-max w-11/12 md:w-full relative rounded-md flex-col items-center justify-center bg-white border border-gray-300 transition transition-border-color transition-transform duration-300 hover:border-gray-500 pt-2"
      style={{ transform: isDeleted && "scale(0)", display: postIsGone && "none" }}
    >
      {(openModal && userId === fk_userId_post) || (openModal && role === "admin") ? (
        <DeleteModal toggleDeleteModal={toggleDeleteModal} handleDeletePost={handleDeletePost} origin={"post"} postId={postId} />
      ) : null}
      <div className="top w-full flex items-center justify-center pb-1 border-b">
        <div className="left-column h-full w-2/12 flex justify-center">
          <button
            className="avatar-container outline-none w-11 h-11 rounded-full border border-gray-300 hover:cursor-pointer"
            style={
              picUrl
                ? { background: `url(${picUrl}) no-repeat center/cover` }
                : {
                    background: `url(${picPlaceholder}) no-repeat center/cover`,
                  }
            }
            onClick={toProfilePage}
          ></button>
        </div>
        <div className="right-column  h-full w-10/12 flex flex-col items-center justify-center">
          <div className="username-title-container h-max w-full flex flex-col items-start justify-center pl-1 pr-3">
            <div className="username-date w-full flex items-center justify-between gap-2">
              <button className="outline-none capitalize hover:cursor-pointer hover:underline" onClick={toProfilePage}>
                <span className="text-xs">@</span>
                {username}
              </button>
              <div className="text-xs italic">{formatTimestamp(date, "post")}</div>
            </div>
            <div className="title font-bold h-max">{title}</div>
          </div>
        </div>
      </div>
      <div className="text w-full text-left px-3 py-2 text-sm">{text}</div>
      <div className="bottom bg-gray-100 h-9 w-full flex items-center justify-end px-2  border-t rounded-bl-md rounded-br-md">
        <div className="icons-container h-full w-max flex items-center justify-end gap-4 text-xs text-gray-500 font-bold rounded-bl-md rounded-br-md">
          <button
            className="outline-none h-full w-max flex items-center justify-center gap-1 hover:bg-gray-200 rounded-sm px-2"
            onClick={toCommentPage}
          >
            <ChatRight size={14} className="font-weight-bold" />
            <span className="font-bold">{commentsNumber}</span> <span className="font-bold">Commentaires</span>
          </button>
          <div className="h-full w-max flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer px-2 rounded-sm">
            <button className="outline-none transform -translate-y-px" onClick={() => handleLike(postId)}>
              {like ? <HandThumbsUpFill size={14} /> : <HandThumbsUp size={14} className="font-weight-bold" />}
            </button>
            <span className="w-4 text-center">{likesNumber}</span>
          </div>
          <button
            className="h-full w-max flex items-center justify-center gap-1 hover:bg-gray-200 px-2 rounded-full"
            onClick={toggleOptions}
          >
            <ThreeDotsVertical />
          </button>
        </div>
      </div>
      <Options
        postUserId={fk_userId_post}
        postId={postId}
        optionsOpen={optionsOpen}
        toggleOptions={toggleOptions}
        toggleDeleteModal={toggleDeleteModal}
      />
    </div>
  );
};

export default Post;

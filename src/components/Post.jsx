import React, { useEffect, useState } from "react";
import { ChatRight, HandThumbsUp, HandThumbsUpFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useHistory } from "react-router";
import { DeleteModal } from ".";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { deletePost } from "../store/actions/posts.action";
import { getUserProfile, likePost, toComment } from "../store/actions/user.action";
import { formatTimestamp } from "../utils/formatTime";
import Options from "./Options";

const Post = ({ post }) => {
  const { title, postId, text, date, username, picUrl, likesCount, commentCount, fk_userId_post } = post;
  const userId = useSelector((state) => state.user.id);
  const store = useStore();
  // const profileName = store.getState().user.currentProfileVisit.username;
  const history = useHistory();
  const sameUser = [];
  const likes = useSelector((state) => state.posts.likes);
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const profileName = useSelector((state) => state.user.currentProfileVisit.username);
  const [name, setName] = useState(profileName);
  console.log(profileName);
  console.log("userId", userId);

  const role = useSelector((state) => state?.user.role);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(profileName);
  }, []);

  useEffect(() => {
    setLikesNumber(likesCount);
  }, [likesCount]);

  useEffect(() => {
    likes.map((like) => {
      if (like.fk_userId_like === userId) {
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
    dispatch(likePost(userId, postId, like));
  };

  const handleDeletePost = () => {
    dispatch(deletePost(postId));
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
    console.log("post id", postId);
    if (userId !== fk_userId_post) {
      dispatch(getUserProfile(fk_userId_post));
    }
    setTimeout(() => {
      history.push(`/profile/${username}`);
    }, 100);
  };

  const toggleOptions = () => {
    setOptionsOpen((optionsOpen) => !optionsOpen);
  };

  const toggleDeleteModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  return (
    <div
      className="post-container h-max w-11/12 md:w-full relative rounded-md flex-col items-center justify-center bg-white border border-gray-300 transition transition-border-color transition-transform duration-300 hover:border-gray-500 pt-2"
      style={{ transform: isDeleted && "scale(0)", display: postIsGone && "none" }}
    >
      {(openModal && userId === fk_userId_post) || (openModal && role === "admin") ? (
        <DeleteModal toggleDeleteModal={toggleDeleteModal} handleDeletePost={handleDeletePost} origin={"post"} />
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
      <div className="bottom bg-gray-100 w-full flex items-center justify-end px-2 py-2 border-t rounded-bl-md rounded-br-md">
        <div className="icons-container w-max flex items-center justify-end gap-4 text-xs text-gray-500 font-bold rounded-bl-md rounded-br-md">
          <button className="outline-none w-max flex items-center justify-center gap-1" onClick={toCommentPage}>
            <ChatRight size={14} className="font-weight-bold" />
            <span>{commentCount}</span> <span className="font-bold">Commentaires</span>
          </button>
          <div className="w-max flex items-center justify-center gap-1">
            <button className="outline-none transform -translate-y-px" onClick={() => handleLike(postId)}>
              {!like ? <HandThumbsUp size={14} className="font-weight-bold" /> : <HandThumbsUpFill size={14} />}
            </button>
            <span>{likesNumber}</span>
          </div>
          <button className="w-max flex items-center justify-center gap-1" onClick={toggleOptions}>
            <ThreeDotsVertical />
          </button>
        </div>
      </div>
      {optionsOpen && (
        <Options userId={fk_userId_post} postId={postId} toggleOptions={toggleOptions} toggleDeleteModal={toggleDeleteModal} />
      )}
    </div>
  );
};

export default Post;

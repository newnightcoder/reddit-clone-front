import React, { useCallback, useEffect, useState } from "react";
import { ChatRight, HandThumbsUp, HandThumbsUpFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { likePost, toComment } from "../store/actions/user.action";
import { history } from "../utils/helpers";
const PostFooter = ({ post }) => {
  const { title, postId, text, imgUrl, date, username, picUrl, likesCount, commentCount, fk_userId_post } = post;
  const [commentsNumber, setcommentsNumber] = useState(commentCount);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [like, setLike] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  // const history = useHistory();
  const allLikes = useSelector((state) => state.posts.likes);
  const sameUser = [];

  const toCommentPage = () => {
    dispatch(toComment(postId));
    setTimeout(() => {
      history.push(`/comments/${title}`);
    }, 100);
  };

  const updateLikesNumber = () => {
    switch (like) {
      case false:
        setLikesNumber(likesNumber + 1);
        break;
      case true:
        setLikesNumber(likesNumber - 1);
        break;
      default:
        setLikesNumber(likesNumber);
    }
  };
  const handleLike = useCallback((postId) => {
    setLike((prevState) => !prevState);
    updateLikesNumber();
    dispatch(likePost("post", userId, postId, like));
  });

  const toggleOptions = () => {
    return setOptionsOpen((optionsOpen) => !optionsOpen);
  };

  useEffect(() => {
    allLikes.map((like) => {
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
  }, [postId, allLikes, userId]);

  useEffect(() => {
    setLikesNumber(likesCount);
    setcommentsNumber(commentCount);
  }, [likesCount, commentCount]);

  return (
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
  );
};

export default PostFooter;

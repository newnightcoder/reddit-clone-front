import React, { useEffect, useState } from "react";
import {
  ChatRight,
  HandThumbsUp,
  HandThumbsUpFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { likePost, toComment } from "../store/actions/user.action";
import { formatTimestamp } from "./formatTime";

const Post = ({ post }) => {
  const { title, postId, text, date, username, picUrl, likesCount, commentCount } = post;
  const currentLikesCount = useSelector((state) => state.user.currentLikesCount);
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();
  const dispatch = useDispatch();
  const sameUser = [];
  const likes = useSelector((state) => state.posts.likes);
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  // const [currentLike, setCurrentLike] = useState(likesCount);

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

    console.log("in useffect", sameUser);
    sameUser.forEach((id) => {
      if (id === postId) {
        setLike(true);
      }
    });
  }, [postId, likes, userId]);

  const handleLike = (id) => {
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
  };

  const toCommentPage = () => {
    dispatch(toComment(postId));
    setTimeout(() => {
      history.push(`/comments/${post.title}`);
    }, 100);
  };

  return (
    <div className="post-container h-max w-11/12 flex-col items-center justify-center bg-white border border-gray-300 transition transition-border-color duration-300 hover:border-gray-500 rounded-md px-2 pt-2">
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
              <div className="text-xs italic">{formatTimestamp(date)}</div>
            </div>
            <div className="title font-bold">{title}</div>
          </div>
        </div>
      </div>
      <div className="text w-full text-left px-3 py-2 text-sm">{text}</div>
      <div className="bottom w-full flex items-center justify-end px-2 py-2 border-t">
        <div className="icons-container w-max flex items-center justify-end gap-4 text-xs">
          <button
            className="outline-none w-max flex items-center justify-center gap-1"
            onClick={toCommentPage}
          >
            <ChatRight size={14} />
            <span>{commentCount}</span> <span>Commentaires</span>
          </button>
          <div className="w-max flex items-center justify-center gap-1">
            <button
              className="outline-none"
              onClick={() => {
                handleLike(postId);
                dispatch(likePost(userId, postId, like));
              }}
            >
              {!like ? <HandThumbsUp size={14} /> : <HandThumbsUpFill size={14} />}
            </button>
            <span>{likesNumber}</span>
          </div>
          <div className="w-max flex items-center justify-center gap-1">
            <ThreeDotsVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

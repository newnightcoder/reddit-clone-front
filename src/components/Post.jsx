import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import fr from "date-fns/locale/fr";
import React, { useState } from "react";
import {
  ChatRight,
  HandThumbsUp,
  HandThumbsUpFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { createComment } from "../store/actions/user.action";
import { API_POST } from "./API";

const Post = ({ post }) => {
  const { title, text, username, picUrl, date } = post;
  const [like, setLike] = useState(false);
  const postId = post.postId;
  const userId = useSelector((state) => state.user.id);
  const history = useHistory();
  const dispatch = useDispatch();

  const formatTimestamp = (date) => {
    const convertedDate = {
      year: date.split("-")[0],
      month: date.split("-")[1],
      day: date.split("-")[2],
      minute: date.split("-")[3],
      seconds: date.split("-")[4],
    };

    return formatDistanceToNowStrict(
      new Date(
        convertedDate.year,
        convertedDate.month,
        convertedDate.day,
        convertedDate.minute,
        convertedDate.seconds
      ),
      { addSuffix: true, locale: fr }
    );
  };

  const toCommentPage = () => {
    dispatch(createComment(postId));
    setTimeout(() => {
      history.push(`/comment/${post.title}`);
    }, 100);
  };

  const postLike = async (postId, userId) => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ postId, userId }),
    };
    switch (like) {
      case false: {
        const response = await fetch(`${API_POST}/like`, request);
        const data = await response.json();
        console.log(data);
        if (response.status !== 200) return;
        setLike(true);
        break;
      }
      case true: {
        const response = await fetch(`${API_POST}/dislike`, request);
        const data = await response.json();
        console.log(data);
        if (response.status !== 200) return;
        setLike(false);
        break;
      }
      default:
        return false;
    }
  };

  return (
    <div className="post-container h-max w-11/12 flex-col items-center justify-center bg-white border border-gray-300 rounded-md px-2 pt-2">
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
          <div className="w-max flex items-center justify-center gap-1">
            <button className="outline-none" onClick={() => toCommentPage(post, userId)}>
              <ChatRight size={14} />
            </button>
            <span>Commenter</span>
          </div>
          <div className="w-max flex items-center justify-center gap-1">
            <button className="outline-none" onClick={() => postLike(postId, userId)}>
              {!like ? <HandThumbsUp size={14} /> : <HandThumbsUpFill size={14} />}
            </button>
            <span>Liker</span>
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

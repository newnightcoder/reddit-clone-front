import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import fr from "date-fns/locale/fr";
import React, { useState } from "react";
import {
  ChatRight,
  HandThumbsUp,
  HandThumbsUpFill,
  ThreeDotsVertical
} from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import picPlaceholder from "../assets/pic_placeholder.svg";
const Comment = ({ comment }) => {
  
  const { picUrl, username, text, date } = comment;
  const likes = useSelector((state) => state.posts.likes);
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState("");

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

  return (
    <div className="comment-container h-max w-full flex-col items-center justify-center bg-white border-b border-gray-100 transition px-2 pt-2">
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
          </div>
        </div>
      </div>
      <div className="text w-full text-left px-3 py-2 text-sm">{text}</div>
      <div className="bottom w-full flex items-center justify-end px-2 py-2 border-t">
        <div className="icons-container w-max flex items-center justify-end gap-4 text-xs">
          <button
            className="outline-none w-max flex items-center justify-center gap-1"
            // onClick={toCommentPage}
          >
            <ChatRight size={14} />
            <span>{}</span> <span>Répondre</span>
          </button>
          <div className="w-max flex items-center justify-center gap-1">
            <button
              className="outline-none"
              onClick={() => {
                // handleLike();
                // dispatch(likePost(userId, postId, like));
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

export default Comment;

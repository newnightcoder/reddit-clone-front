import React, { useState } from "react";
import {
  ChatRight,
  HandThumbsUp,
  HandThumbsUpFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { formatTimestamp } from "./formatTime";

const Reply = ({ reply: { text, date, username, picUrl } }) => {
  const [like, setLike] = useState(false);

  const [likesNumber, setLikesNumber] = useState(null);
  const [replyOpen, setReplyOpen] = useState(false);

  const toggleReply = () => {
    return setReplyOpen((replyOpen) => !replyOpen);
  };
  return (
    <div
      className="reply-container h-max w-11/12 flex-col items-center justify-center bg-white border-b border-gray-100 transition-all duration-300 px-2 pt-2 "
      style={{ marginBottom: replyOpen && "5px" }}
    >
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
            onClick={toggleReply}
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

export default Reply;

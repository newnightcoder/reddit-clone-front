import React from "react";
import { useSelector } from "react-redux";
import { picPlaceholder } from "../assets";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useHandleLink } from "../utils/hooks";

const PostHeader = ({ post }) => {
  const { title, date, username: authorName, picUrl, fk_userId_post } = post;
  const { id, username: myName } = useSelector((state) => state.user);
  const handleLink = useHandleLink();

  return (
    <div className="top w-full flex items-center justify-center pl-2 pb-1 border-b dark:border-gray-700">
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
          onClick={() =>
            handleLink("post-profile", fk_userId_post === id ? id : fk_userId_post, authorName === myName ? myName : authorName)
          }
        ></button>
      </div>
      <div className="right-column  h-full w-10/12 flex flex-col items-center justify-center">
        <div className="username-title-container h-max w-full flex flex-col items-start justify-center pl-1 pr-3">
          <div className="username-date w-full flex items-center justify-between gap-2">
            <button
              className="outline-none capitalize hover:cursor-pointer hover:underline"
              onClick={() =>
                handleLink(
                  "post-profile",
                  fk_userId_post === id ? id : fk_userId_post,
                  authorName === myName ? myName : authorName
                )
              }
            >
              <span className="text-xs">@</span>
              {authorName}
            </button>
            <div className="text-xs italic">{formatTimestamp(date, "post")}</div>
          </div>
          <div className="title font-bold h-max">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;

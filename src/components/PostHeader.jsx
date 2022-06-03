import React from "react";
import { useSelector } from "react-redux";
import { picPlaceholder } from "../assets";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useHandleLink } from "../utils/hooks";

const PostHeader = ({ post }) => {
  const { title, date, username: authorName, picUrl, fk_userId_post } = post;
  const { id, username: myName, language } = useSelector((state) => state.user);
  const handleLink = useHandleLink();

  return (
    <div className="top w-full flex items-start justify-between border-b transition-color duration-500 border-gray-100 dark:border-gray-700 py-1 px-4">
      <div className="left-column h-full w-max pr-1 flex justify-center">
        <button
          className="avatar-container outline-none border-[1px] dark:border-gray-600 w-11 h-11 rounded-full hover:cursor-pointer"
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
      <div className="right-column  h-full w-full flex flex-col items-center justify-center">
        <div className="username-title-container h-max w-full flex flex-col items-start justify-center">
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
            <div className="text-xs italic whitespace-nowrap">{formatTimestamp(date, "post", language)}</div>
          </div>
          <div className="title text-lg font-bold h-max w-[97%] pl-1 break-all">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;

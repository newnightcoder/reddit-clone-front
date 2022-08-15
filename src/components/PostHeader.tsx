import { useSelector } from "react-redux";
import { picPlaceholder } from "../assets";
import { IPost } from "../store/types";
import { formatTimestamp } from "../utils/helpers/formatTime";
import { useHandleLink } from "../utils/hooks";

const PostHeader = ({ post, aside }: { post: IPost; aside: boolean }) => {
  const { title, date, author } = post;
  const { id: myId, username: myName, language } = useSelector((state) => state.user);
  const handleLink = useHandleLink();

  return (
    <div className="top w-full flex items-start justify-start border-b transition-color duration-500 border-gray-100 dark:border-gray-800 pt-3 md:pt-2 pb-2 px-4">
      <div className="left-column h-full w-max pr-1 flex justify-center">
        <button
          className="avatar-container outline-none border-[1px] dark:border-gray-600 w-11 h-11 rounded-full hover:cursor-pointer"
          style={
            author?.picUrl
              ? { background: `url(${author.picUrl}) no-repeat center/cover` }
              : {
                  background: `url(${picPlaceholder}) no-repeat center/cover`,
                }
          }
          onClick={() =>
            handleLink(
              "post-profile",
              author?.id === myId ? myId : author.id,
              author?.username === myName ? myName : author.username
            )
          }
        ></button>
      </div>
      <div className="right-column h-full w-[calc(100%-3rem)] flex flex-col items-center justify-start">
        <div className="username-title-container h-max w-full flex flex-col items-start justify-center">
          <div className="username-date w-full flex items-center justify-between">
            <button
              className={` ${
                aside ? "w-full pr-2" : "w-[80%] pr-10"
              } outline-none capitalize hover:cursor-pointer hover:underline`}
              onClick={() =>
                handleLink(
                  "post-profile",
                  author?.id === myId ? myId : author.id,
                  author?.username === myName ? myName : author.username
                )
              }
            >
              <div className="w-full text-left truncate">
                <span className="text-xs">@</span>
                <span className="w-full text-left">{author?.username ? author.username : "Noname"}</span>
              </div>
            </button>
            {!aside && <div className="w-min text-xs italic whitespace-nowrap">{formatTimestamp(date, "post", language)}</div>}
          </div>
          <div className="title text-lg font-bold h-max w-full pl-1 break-words leading-5">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;

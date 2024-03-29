import { useCallback, useEffect, useState } from "react";
import { HandThumbsUp, HandThumbsUpFill, ThreeDotsVertical } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal, Options } from "..";
import { picPlaceholder } from "../../assets";
import { deletePostAction } from "../../store/actions/posts.action";
import { likePostAction } from "../../store/actions/user.action";
import { IReply } from "../../store/types";
import { formatTimestamp } from "../../utils/helpers/formatTime";
import { useToggle } from "../../utils/hooks";

const Reply = ({ reply }: { reply: IReply }) => {
  const { replyId, fk_userId_reply, fk_commentId, text, date, username, picUrl, likesCount } = reply;
  const likes = useSelector((state) => state?.posts.likes);
  const { id: userId, role } = useSelector((state) => state?.user);
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const sameUserReply: number[] = [];
  const dispatch = useDispatch();
  const toggleOptions = useToggle(optionsOpen, setOptionsOpen);
  const toggleDeleteModal = useToggle(openDeleteModal, setOpenDeleteModal);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isMounted) {
      setLikesNumber(likesCount);
    }
  }, [likesCount, isMounted]);

  useEffect(() => {
    if (isMounted) {
      likes?.map((like) => {
        if (like.userId === userId! && like.replyId === replyId!) {
          return sameUserReply.push(like.replyId);
        }
        return sameUserReply;
      });
      sameUserReply.forEach((id) => {
        if (id === replyId) {
          setLike(true);
        }
      });
    }
  }, [replyId, likes, userId, isMounted]);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleLike = useCallback(
    (replyId) => {
      setLike((like) => !like);
      switch (like) {
        case false:
          return setLikesNumber(likesNumber! + 1);
        case true:
          return setLikesNumber(likesNumber! - 1);
        default:
          break;
      }
      dispatch(likePostAction("reply", userId!, replyId, like));
    },
    [dispatch, like, likesNumber, userId]
  );

  const handleDeletePost = useCallback(() => {
    dispatch(deletePostAction(replyId!, "reply", fk_commentId));
    setIsDeleted(true);
    setTimeout(() => {
      setpostIsGone(true);
    }, 500);
  }, [dispatch, replyId, fk_commentId]);

  return (
    <div
      className="reply-container relative h-max w-11/12 flex-col items-center justify-center text-gray-900 dark:text-gray-300 transition duration-500 bg-white dark:bg-gray-900 border border-transparent dark:border-transparent hover:border-gray-200 dark:hover:border-gray-400 rounded-md px-2 py-1 "
      style={{ transform: isDeleted ? "scale(0)" : "", display: postIsGone ? "none" : "" }}
    >
      {(openDeleteModal && userId === fk_userId_reply) || (openDeleteModal && role === "admin") ? (
        <DeleteModal toggleDeleteModal={toggleDeleteModal} handleDeletePost={handleDeletePost} origin={"reply"} />
      ) : null}
      <div className="top w-full flex items-center justify-center pl-1 py-1 transition-color duration-500 border-b dark:border-gray-800">
        <div className="left-column h-full w-max flex justify-center">
          <div
            className="avatar-container w-11 h-11 rounded-full border transition-color duration-500 border-gray-300 dark:border-gray-600"
            style={
              picUrl
                ? { background: `url(${picUrl}) no-repeat center/cover` }
                : {
                    background: `url(${picPlaceholder}) no-repeat center/cover`,
                  }
            }
          ></div>
        </div>
        <div className="right-column h-full w-full flex flex-col items-center justify-center pl-2 pr-4">
          <div className="username-title-container h-12 w-full flex flex-col items-start justify-center">
            <div className="username-date w-full flex items-center justify-between space-x-2">
              <div className="capitalize">
                <span className="text-xs">@</span>
                {username}
              </div>
              <div className="text-xs italic">{formatTimestamp(date, "post", "")}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text w-full text-left px-3 py-2 text-sm break-words whitespace-pre-line">{text}</div>
      <div className="bottom w-full flex items-center justify-end px-2 py-2">
        <div className="icons-container w-max flex items-center justify-end space-x-4 text-xs">
          <div className="w-max flex items-center justify-center">
            <button className="outline-none" onClick={() => handleLike(replyId)}>
              {like ? <HandThumbsUpFill size={14} /> : <HandThumbsUp size={14} className="font-weight-bold" />}
            </button>
            <span className="w-4 text-center">{likesNumber}</span>
          </div>
          <button className="w-max flex items-center justify-center space-x-1" onClick={toggleOptions}>
            <ThreeDotsVertical />
          </button>
        </div>
      </div>
      <Options
        replyUserId={fk_userId_reply}
        replyId={replyId}
        optionsOpen={optionsOpen}
        toggleOptions={toggleOptions}
        toggleDeleteModal={toggleDeleteModal}
      />
    </div>
  );
};

export default Reply;

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal, Options, PostFooter, PostHeader } from ".";
import "../index.css";
import { deletePost } from "../store/actions/posts.action";
import { likePost, toComment } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import LinkPreview from "./LinkPreview";

const Post = ({ post, aside }) => {
  const {
    title,
    postId,
    text,
    imgUrl,
    likesCount,
    commentCount,
    fk_userId_post,
    isPreview,
    previewTitle,
    previewText,
    previewImg,
    previewPub,
    previewPubLogo,
    previewUrl,
  } = post;
  const lastPostAdded = useSelector((state) => state.posts.lastPostAdded);
  const userId = useSelector((state) => state.user.id);
  const role = useSelector((state) => state?.user.role);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [commentsNumber, setcommentsNumber] = useState(commentCount);
  const [like, setLike] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const allLikes = useSelector((state) => state.posts.likes);
  const sameUser = [];
  const dispatch = useDispatch();

  const toggleOptions = useCallback(() => {
    return setOptionsOpen((optionsOpen) => !optionsOpen);
  }, [optionsOpen]);

  const toggleDeleteModal = useCallback(() => {
    return setOpenModal((openModal) => !openModal);
  }, [openModal]);

  const handleDeletePost = useCallback(() => {
    dispatch(deletePost(postId, "post", null));
    setIsDeleted(true);
    setTimeout(() => {
      setpostIsGone(true);
    }, 500);
  }, [dispatch, postId]);

  const toCommentPage = useCallback(() => {
    dispatch(toComment(postId));
    history.push(`/comments/${title}`);
  }, [dispatch, postId, title]);

  const updateLikesNumber = useCallback(() => {
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
  }, [like, likesNumber]);

  const handleLike = useCallback(
    (postId) => {
      setLike((prevState) => !prevState);
      updateLikesNumber();
      dispatch(likePost("post", userId, postId, like));
    },
    [like, dispatch]
  );

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
    <div
      onClick={() => console.log(post)}
      className="post-container scale-0 h-max w-full max-w-3xl relative md:rounded-md flex-col items-center justify-center bg-white dark:bg-gray-900 border-t border-b md:border border-gray-300 dark:border-gray-700 transition transition-border-color transition-transform duration-300 hover:border-gray-500 dark:hover:border-gray-500 pt-2"
      style={{
        transform: isDeleted && "scale(0)",
        display: postIsGone && "none",
        animation: postId === lastPostAdded && "postAppear 500ms forwards",
      }}
    >
      {(openModal && userId === fk_userId_post) || (openModal && role === "admin") ? (
        <DeleteModal toggleDeleteModal={toggleDeleteModal} handleDeletePost={handleDeletePost} origin={"post"} postId={postId} />
      ) : null}
      <PostHeader post={post} />
      {isPreview === 1 ? (
        <div className="w-full flex items-center justify-center py-4">
          <LinkPreview
            previewTitle={previewTitle}
            previewText={previewText}
            previewImg={previewImg}
            previewPub={previewPub}
            previewPubLogo={previewPubLogo}
            previewUrl={previewUrl}
            aside={aside}
          />
        </div>
      ) : (
        <>
          <div className="text w-full text-left px-3 py-2 text-sm">{text}</div>
          <div className={"w-full flex items-center justify-center px-2 pb-4"}>
            {imgUrl !== "" ? (
              <img
                src={imgUrl}
                alt={imgUrl.includes(".gif") ? "gif" : "picture"}
                className="rounded"
                style={{
                  width: imgUrl.includes(".gif") ? "100%" : "auto",
                  height: imgUrl.includes(".gif") ? "auto" : "100%",
                  maxHeight: "500px",
                }}
              />
            ) : null}
          </div>
        </>
      )}
      <PostFooter
        postId={postId}
        like={like}
        likesNumber={likesNumber}
        commentsNumber={commentsNumber}
        toggleOptions={toggleOptions}
        handleLike={handleLike}
        toCommentPage={toCommentPage}
      />
      <Options
        postUserId={fk_userId_post}
        postId={postId}
        optionsOpen={optionsOpen}
        toggleOptions={toggleOptions}
        toggleDeleteModal={toggleDeleteModal}
      />
    </div>
  );
};

export default Post;

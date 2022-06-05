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
  const { lastPostAdded, likes: allLikes } = useSelector((state) => state.posts);
  const { id: userId, role, liked } = useSelector((state) => state.user);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [commentsNumber, setcommentsNumber] = useState(commentCount);
  const [like, setLike] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const toggleOptions = useCallback(() => {
    console.log("clicked to close");
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
    const formattedTitle = title.replace(/[^a-zA-ZÀ-ÿ0-9\s-]/gi, "").replace(/\s|-/g, "_");
    history.push(`/comments/${formattedTitle}`);
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
  }, [like, setLikesNumber, likesNumber]);

  const handleLike = useCallback(
    (postId) => {
      setLike((prevState) => !prevState);
      updateLikesNumber();
      dispatch(likePost("post", userId, postId, like));
    },
    [postId, setLike, like, dispatch, updateLikesNumber]
  );

  useEffect(() => {
    setLikesNumber(likesCount);
    setcommentsNumber(commentCount);
  }, [likesCount, commentCount]);

  const setCurrentUserLikes = useCallback(() => {
    allLikes?.map((like) => {
      if (like.fk_userId_like === userId && like.fk_postId_like === postId) {
        return setLike(true);
      }
    });
  }, [allLikes, userId, postId]);

  useEffect(() => {
    setCurrentUserLikes();
  }, [allLikes]);

  return (
    <div
      onClick={optionsOpen ? toggleOptions : undefined}
      className={`post-container ${postId === lastPostAdded && "animate-post"} ${isDeleted && "scale-0"} ${
        postIsGone && "hidden"
      } h-max w-full relative md:rounded-md flex-col items-center justify-center text-gray-900 dark:text-gray-300 transition duration-500 bg-white dark:bg-gray-900  pt-2`}
    >
      {(openModal && userId === fk_userId_post) || (openModal && role === "admin") ? (
        <DeleteModal toggleDeleteModal={toggleDeleteModal} handleDeletePost={handleDeletePost} origin={"post"} postId={postId} />
      ) : null}
      <PostHeader post={post} />
      {text && <div className="w-full text-left px-4 pt-2 transition duration-500 text-sm break-words">{text}</div>}

      {isPreview === 1 ? (
        <div className="w-full flex items-center justify-center px-4 pt-2 pb-4">
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
          <div className={"w-full flex items-center justify-center px-2 pt-3 pb-4"}>
            {imgUrl !== "" ? (
              <img
                src={imgUrl}
                alt={imgUrl.includes(".gif") ? "gif" : "picture"}
                className="rounded w-auto"
                style={{
                  height: imgUrl?.includes(".gif") ? "auto" : "100%",
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

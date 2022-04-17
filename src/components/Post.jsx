import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal, Options, PostFooter, PostHeader } from ".";
import "../index.css";
import { deletePost } from "../store/actions/posts.action";
import LinkPreview from "./LinkPreview";

const Post = ({ post, aside }) => {
  const {
    title,
    postId,
    text,
    imgUrl,
    date,
    username,
    picUrl,
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
  const likes = useSelector((state) => state.posts.likes);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [commentsNumber, setcommentsNumber] = useState(commentCount);
  const [like, setLike] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const toggleOptions = () => {
    return setOptionsOpen((optionsOpen) => !optionsOpen);
  };

  const toggleDeleteModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(postId, "post", null));
    setIsDeleted(true);
    setTimeout(() => {
      setpostIsGone(true);
    }, 500);
  };

  return (
    <div
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
          <div
            className={
              // `${imgUrl !== "" ? "h-96" : "h-full"}
              "w-full flex items-center justify-center pb-4"
            }
          >
            {imgUrl !== "" ? <img src={imgUrl} className="w-full h-max" /> : null}
          </div>
        </>
      )}
      <PostFooter post={post} toggleOptions={toggleOptions} />
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

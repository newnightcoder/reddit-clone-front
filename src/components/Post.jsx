import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal, Options, PostFooter, PostHeader } from ".";
import "../index.css";
import { deletePost } from "../store/actions/posts.action";
import { useLinkToProfile } from "../utils/hooks";

const Post = ({ post }) => {
  const { title, postId, text, imgUrl, date, username, picUrl, likesCount, commentCount, fk_userId_post } = post;
  const lastPostAdded = useSelector((state) => state.posts.lastPostAdded);
  const userId = useSelector((state) => state.user.id);
  const role = useSelector((state) => state?.user.role);
  const likes = useSelector((state) => state.posts.likes);
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [commentsNumber, setcommentsNumber] = useState(commentCount);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postIsGone, setpostIsGone] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const linkToProfile = useLinkToProfile();
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
      className="post-container scale-0 h-max w-11/12 md:w-full max-w-3xl relative rounded-md flex-col items-center justify-center bg-white border border-gray-300 transition transition-border-color transition-transform duration-300 hover:border-gray-500 pt-2"
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
      <div className="text w-full text-left px-3 py-2 text-sm">{text}</div>
      <div className="h-full w-full flex items-center justify-center">
        {imgUrl !== null && <img src={imgUrl} className="w-11/12" />}
      </div>
      <PostFooter post={post} />
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

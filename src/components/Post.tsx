import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { DeleteModal, LinkPreview, Options, PostFooter, PostHeader } from ".";
import "../index.css";
import { deletePostAction } from "../store/actions/posts.action";
import { likePostAction, toCommentAction } from "../store/actions/user.action";
import { history } from "../utils/helpers";
import { useToggle } from "../utils/hooks";
import { PostProps } from "./react-app-env";

const Post = ({ post, aside }: PostProps) => {
  const { title, id: postId, text, imgUrl, engagement, author, isPreview, preview } = post;
  const { likes: allLikes, lastPostAdded } = useSelector((state) => state.posts);
  const { id: userId, role } = useSelector((state) => state.user);
  const [likesNumber, setLikesNumber] = useState(engagement!.likesCount);
  const [commentsNumber, setcommentsNumber] = useState(engagement!.commentCount);
  const [like, setLike] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const postContainerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const optionsBtnRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const profilePage = pathname.includes("/profile");
  const toggleOptions = useToggle(optionsOpen, setOptionsOpen);
  const toggleDeleteModal = useToggle(openDeleteModal, setOpenDeleteModal);

  const handleDeletePost = useCallback(() => {
    console.log("pre dispatsch delete");
    dispatch(deletePostAction(postId!, "post", null));
    console.log("post dispatsch delete");
    setIsDeleted(true);
  }, [dispatch, postId]);

  const toCommentPage = useCallback(() => {
    dispatch(toCommentAction(postId!));
    const formattedTitle = title.replace(/[^a-zA-ZÀ-ÿ0-9\s-]/gi, "").replace(/\s|-/g, "_");
    history.push(`/comments/${formattedTitle}`);
  }, [dispatch, postId, post.title]);

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
      dispatch(likePostAction("post", userId!, postId, like));
    },
    [postId, setLike, like, dispatch, updateLikesNumber]
  );

  useEffect(() => {
    if (!isDeleted) {
      setLikesNumber(engagement!.likesCount);
      setcommentsNumber(engagement!.commentCount);
    }
  }, [engagement!.likesCount, engagement!.commentCount, isDeleted]);

  const setCurrentUserLikes = useCallback(() => {
    allLikes?.map((like) => {
      if (like.fk_userId_like === userId && like.fk_postId_like === postId) {
        return setLike(true);
      }
    });
  }, [allLikes, userId, postId]);

  useEffect(() => {
    if (!isDeleted) {
      setCurrentUserLikes();
    }
  }, [allLikes, isDeleted]);

  return (
    <div
      id="postContainer"
      ref={postContainerRef}
      className={`post-container ${postId === lastPostAdded ? "animate-post" : ""} ${
        isDeleted ? "scale-0" : ""
      }  h-max w-full relative md:rounded-md flex-col items-center justify-center text-gray-900 dark:text-gray-300 border-t border-b dark:border-black md:border ${
        profilePage ? "md:border-gray-400 dark:md:border-gray-600" : "md:border-gray-300 dark:md:border-gray-700"
      } md:hover:border-gray-900 dark:md:hover:border-gray-400 transition duration-500 bg-white dark:bg-gray-900 pt-2`}
    >
      {(openDeleteModal && userId === author.id) || (openDeleteModal && role === "admin") ? (
        <DeleteModal toggleDeleteModal={toggleDeleteModal} handleDeletePost={handleDeletePost} origin={"post"} postId={postId!} />
      ) : null}
      <PostHeader post={post} />
      {text && <div className="w-full text-left px-4 pt-2 transition duration-500 text-sm break-words">{text}</div>}

      {isPreview ? (
        <div className="w-full flex items-center justify-center px-4 pt-2 pb-4">
          <LinkPreview linkPreview={preview!} aside={aside!} />
        </div>
      ) : (
        <>
          <div className={"w-full flex items-center justify-center px-4 pt-3 pb-4"}>
            {imgUrl !== "" ? (
              <img
                src={imgUrl}
                alt={imgUrl?.includes(".gif") ? "gif" : "picture"}
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
        postId={postId!}
        like={like}
        likesNumber={likesNumber}
        commentsNumber={commentsNumber}
        optionsOpen={optionsOpen}
        // setOptionsOpen={setOptionsOpen}
        toggleOptions={toggleOptions}
        handleLike={handleLike}
        toCommentPage={toCommentPage}
        optionsBtnRef={optionsBtnRef}
      />
      <Options
        postUserId={author.id}
        postId={postId}
        optionsOpen={optionsOpen}
        toggleOptions={toggleOptions}
        toggleDeleteModal={toggleDeleteModal}
        optionsRef={optionsRef}
      />
    </div>
  );
};

export default Post;

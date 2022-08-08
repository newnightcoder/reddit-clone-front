import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { DeleteModal, LinkPreview, Options, PostFooter, PostHeader } from ".";
import "../index.css";
import { deletePostAction } from "../store/actions/posts.action";
import { likePostAction, toCommentAction } from "../store/actions/user.action";
import { fromCDN, history } from "../utils/helpers";
import { useToggle } from "../utils/hooks";
import { PostProps } from "./react-app-env";

const Post = ({ post, aside }: PostProps) => {
  const { title, id: postId, text, imgUrl, engagement, author, isPreview, preview } = post;
  const { likes: allLikes, lastPostAdded } = useSelector((state) => state.posts);
  const { id: userId, role } = useSelector((state) => state.user);
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
  const isFromS3Bucket = imgUrl?.includes("forum-s3-bucket");

  // const formatWithLineBreaks = (str)=>{
  // }

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

  const handleLike = useCallback(
    (postId) => {
      setLike((prevState) => !prevState);
      dispatch(likePostAction("post", userId!, postId, like));
    },
    [setLike, dispatch, userId, postId, like]
  );

  const setUserLikes = useCallback(() => {
    allLikes.forEach((like) => {
      if (like.userId === userId && like.postId === postId) {
        return setLike(true);
      }
    });
  }, [allLikes, userId, postId, setLike]);

  useEffect(() => {
    setUserLikes();
  }, []);

  return (
    <div
      id="postContainer"
      ref={postContainerRef}
      className={`post-container ${postId === lastPostAdded ? "animate-post" : ""} ${
        isDeleted ? "scale-0" : ""
      }  h-max w-full relative md:rounded-md flex-col items-center justify-center text-gray-900 dark:text-gray-300 border-t border-b dark:border-black md:border ${
        profilePage ? "md:border-gray-400 dark:md:border-gray-600" : "md:border-white dark:md:border-gray-700"
      } md:hover:border-gray-900 dark:md:hover:border-gray-400 transition duration-500 bg-white dark:bg-gray-900 pt-2`}
    >
      {(openDeleteModal && userId === author.id) || (openDeleteModal && role === "admin") ? (
        <DeleteModal toggleDeleteModal={toggleDeleteModal} handleDeletePost={handleDeletePost} origin={"post"} postId={postId!} />
      ) : null}
      <PostHeader post={post} />
      {text && (
        <div className="w-full text-left px-4 pt-2 transition duration-500 text-sm whitespace-pre-line">
          {text.replace(/<br>/g, "\n")}
        </div>
      )}

      {isPreview ? (
        <div className="w-full flex items-center justify-center px-4 pt-2 pb-4">
          <LinkPreview linkPreview={preview!} aside={aside!} />
        </div>
      ) : (
        <>
          <div className={"w-full flex items-center justify-center px-4 pt-3 pb-4"}>
            {imgUrl !== "" ? (
              <img
                src={isFromS3Bucket ? fromCDN(imgUrl!) : imgUrl}
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
        commentsNumber={engagement!.commentCount}
        likesNumber={engagement!.likesCount}
        optionsOpen={optionsOpen}
        toggleOptions={toggleOptions}
        handleLike={handleLike}
        toCommentPage={toCommentPage}
        optionsBtnRef={optionsBtnRef}
      />
      <Options
        postUserId={author?.id}
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

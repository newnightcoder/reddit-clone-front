import "draft-js/dist/Draft.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useLocation } from "react-router-dom";
import { PostForm } from "../components";
import Layout from "../components/ Layout";
import { editPost, getPosts } from "../store/actions/posts.action";
import { history } from "../utils/helpers";

const EditPage = () => {
  const { error, posts, comments, replies } = useSelector((state) => state.posts);
  const isAuthenticated = useSelector((state) => state?.user.isAuthenticated);
  const location = useLocation();
  const { postId, commentId, replyId } = location?.state;

  const [postToEdit] = posts.filter((post) => post.postId === postId);
  const [commentToEdit] = comments.filter((comment) => comment.commentId === commentId);
  const [replyToEdit] = replies.filter((reply) => reply.replyId === replyId);
  const [postTitle, setPostTitle] = useState(postToEdit && postToEdit.title);
  const [postText, setPostText] = useState(postToEdit && postToEdit.text);
  const [postImg, setPostImg] = useState(postToEdit && postToEdit.imgUrl);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const emptyTitleError = "Votre titre est vide!\n Mettez un mot ou deux...";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleEditTitleInput = useCallback((e) => {
    setPostTitle(e.currentTarget.value);
    console.log(e.currentTarget.value);
    setEmptyTitle(false);
  });

  const handleEditText = useCallback((e) => {
    setPostText(e.currentTarget.textContent);
    setEmptyTitle(false);
  });

  const handleEditSubmit = useCallback((e) => {
    e.preventDefault();
    if (postTitle && postTitle.length === 0) return setEmptyTitle(true);
    if (error.length !== 0) return setServerErrorMsg(error);
    setServerErrorMsg("");

    if (postToEdit !== undefined) {
      dispatch(editPost("post", postId, postTitle, postText, postImg));
      history.push({ pathname: "/feed" });
    }
    if (commentToEdit !== undefined) {
      dispatch(editPost("comment", commentId, postTitle, postText));
      history.push({ pathname: `/comments/${postTitle}` });
    }
    if (replyToEdit !== undefined) {
      dispatch(editPost("reply", replyId, postTitle, postText));
      history.push({ pathname: `/comments/${postTitle}` });
    }
    console.log(postText);
  });

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Layout>
          <div
            className="w-10/12 bg-gray-200 flex flex-col items-center justify-start pt-16"
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <div
              className="error h-12 w-10/12 md:w-1/2 xl:w-1/3 whitespace-pre bg-black text-white text-sm text-center py-1 rounded"
              style={{ display: emptyTitle ? "block" : "none" }}
            >
              {emptyTitle && emptyTitleError}
              {error.length !== 0 && serverErrorMsg}
            </div>
            <div className="w-10/12">
              <PostForm
                postToEdit={postToEdit}
                postTitle={postTitle}
                postText={postText}
                postImg={postImg}
                handleEditTitleInput={handleEditTitleInput}
                handleEditText={handleEditText}
                handleEditSubmit={handleEditSubmit}
              />
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default EditPage;

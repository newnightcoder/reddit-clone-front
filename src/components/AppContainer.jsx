import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Menu, NavBar, Overlay, SessionExpiredModal, Wrapper } from "../components";
import {
  CommentPage,
  CreatePostPage,
  DeletedProfilePage,
  EditPage,
  FeedPage,
  HomePage,
  LoginPage,
  ProfilePage,
  SignupPage,
} from "../pages";
import { getPosts } from "../store/actions/posts.action";

const AppContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const sessionExpired = useSelector((state) => state.posts.sessionExpired);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionExpired) setIsExpired(true);
    console.log("session expired useEffect", sessionExpired);
  }, [sessionExpired]);

  const toggleMenu = () => {
    return setIsOpen((isOpen) => !isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    dispatch(getPosts());
  };

  const closeExpirationModal = () => {
    setIsExpired(false);
  };

  return (
    <div className="h-screen w-screen relative bg-gray-100">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/fin" component={DeletedProfilePage} />
        <Route component={Wrapper}>
          <NavBar toggleMenu={toggleMenu} closeMenu={closeMenu} isOpen={isOpen} />
          <Route path="/feed" component={FeedPage} />
          <Route path="/create" component={CreatePostPage} />
          <Route path="/edit" component={EditPage} />
          <Route path="/comments" component={CommentPage} />
          <Route path="/profile" component={ProfilePage} />
        </Route>
      </Switch>
      <Overlay isOpen={isOpen} close={closeMenu} />
      {isOpen && <Menu isOpen={isOpen} toggleMenu={toggleMenu} />}
      <SessionExpiredModal isExpired={isExpired} close={closeExpirationModal} />
    </div>
  );
};

export default AppContainer;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import {
  CommentPage,
  CreatePost,
  DeletedProfile,
  Feed,
  Homepage,
  Login,
  Menu,
  NavBar,
  Overlay,
  SessionExpiredModal,
  Signup,
  Wrapper,
} from ".";

const AppContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const sessionExpired = useSelector((state) => state.posts.sessionExpired);
  console.log("session expired", sessionExpired);

  useEffect(() => {
    if (sessionExpired) setIsExpired(true);
    console.log("session expired useEffect", sessionExpired);
  }, [sessionExpired]);

  const toggleMenu = () => {
    return setIsOpen((isOpen) => !isOpen);
  };

  const closeMenu = () => {
    return setIsOpen(false);
  };

  const closeExpirationModal = () => {
    setIsExpired(false);
  };

  return (
    <div className="h-screen w-screen relative">
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/fin" component={DeletedProfile} />
        <Route component={Wrapper}>
          <NavBar toggleMenu={toggleMenu} closeMenu={closeMenu} isOpen={isOpen} />
          <Route path="/feed" component={Feed} />
          <Route path="/create" component={CreatePost} />
          <Route path="/comments" component={CommentPage} />
        </Route>
      </Switch>{" "}
      <Overlay isOpen={isOpen} close={closeMenu} />
      <Menu isOpen={isOpen} />
      <SessionExpiredModal isExpired={isExpired} close={closeExpirationModal} />
    </div>
  );
};

export default AppContainer;

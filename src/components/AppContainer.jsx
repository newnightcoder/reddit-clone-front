import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
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
  Signup,
  Wrapper,
} from ".";

const AppContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sessionExpired = useSelector((state) => state.posts.posts);
  const toggleMenu = () => {
    return setIsOpen((isOpen) => !isOpen);
  };

  const closeMenu = () => {
    return setIsOpen(false);
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
      {sessionExpired && (
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-2  fixed top-0 left-0 z-50 bg-gray-900 transition-opacity duration-500 opacity-0 text-white text-sm"
          style={sessionExpired && { opacity: 0.9 }}
        >
          Votre session a expiré! <br />{" "}
          <span className="flex gap-1">
            Veuillez vous reconnecter
            <Link to="/login" className="underline hover:text-red-500">
              ici
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default AppContainer;

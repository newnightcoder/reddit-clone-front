import React from "react";
import { Route, Switch } from "react-router-dom";
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

const AppContainer = () => {
  return (
    <div className="h-full w-full relative">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/feed" component={FeedPage} />
        <Route path="/create" component={CreatePostPage} />
        <Route path="/edit" component={EditPage} />
        <Route path="/comments" component={CommentPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/fin" component={DeletedProfilePage} />
      </Switch>
    </div>
  );
};

export default AppContainer;

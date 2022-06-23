import { Route, Switch } from "react-router-dom";
import {
  CommentPage,
  CreatePostPage,
  DeletedProfilePage,
  EditPostPage,
  FeedPage,
  HomePage,
  LoginPage,
  ProfilePage,
  SignupPage,
} from "../pages";

const AppContainer = () => {
  return (
    <div className="min-h-screen w-full md:min-w-[320px] relative transition-color duration-500">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/feed" component={FeedPage} />
        <Route path="/create" component={CreatePostPage} />
        <Route path="/edit" component={EditPostPage} />
        <Route path="/comments" component={CommentPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/fin" component={DeletedProfilePage} />
      </Switch>
    </div>
  );
};

export default AppContainer;

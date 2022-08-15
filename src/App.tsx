import { Route, Router, Switch } from "react-router-dom";
import {
  CommentPage,
  CreatePostPage,
  DeletedProfilePage,
  FeedPage,
  HomePage,
  LoginPage,
  ProfilePage,
  SearchPage,
  SignupPage,
} from "./pages";
import { history } from "./utils/helpers";

const App = () => {
  return (
    <div className="h-full w-full md:min-w-[320px] relative transition-color duration-500">
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/feed" component={FeedPage} />
          <Route path="/create" component={CreatePostPage} />
          <Route path="/comments" component={CommentPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/fin" component={DeletedProfilePage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

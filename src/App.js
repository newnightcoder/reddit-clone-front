import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  CommentPage,
  CreatePost,
  DeletedProfile,
  Feed,
  Homepage,
  Login,
  NavBar,
  Signup,
} from "./components";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/create">
          <NavBar />
          <CreatePost />
        </Route>
        <Route path="/comments">
          <NavBar />
          <CommentPage />
        </Route>
        <Route path="/feed">
          <NavBar />
          <Feed />
        </Route>
        <Route path="/fin">
          <DeletedProfile />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

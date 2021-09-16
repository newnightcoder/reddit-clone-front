import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Homepage, Login, Signup } from "./components";
import Feed from "./components/Feed";

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
        <Route path="/feed">
          <Feed />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Feed, Homepage, Login, Signup } from "./components";

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

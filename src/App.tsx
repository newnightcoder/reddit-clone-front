import React from "react";
import { Router } from "react-router-dom";
import { AppContainer } from "./components";
import { history } from "./utils/helpers";

const App = () => {
  return (
    <Router history={history}>
      <AppContainer />
    </Router>
  );
};

export default App;

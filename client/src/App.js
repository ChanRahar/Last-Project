import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RPS from "./pages/RPS"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={RPS} />
          <Route component={"nothing"} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

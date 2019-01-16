import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RPS from "./pages/RPS"
import Main from "./pages/Main"
import Nav from "./components/Nav";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import LeaderBoard from "./pages/LeaderBoard"
import API from "./utils/API"

function App() {
   function logout()  {
     console.log("clicked")
    API.logout()
    .then(window.location.href = "/")
    .catch(err => console.log(err));
  }

  return (
    <Router>
      <div>
        <Nav
        onClick = {logout} />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/RPS" component={RPS} />
          <Route exact path="/Leader_Board" component={LeaderBoard} />
          <Route component={"nothing"} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

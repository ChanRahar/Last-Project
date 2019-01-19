import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RPS from "./pages/RPS"
import Main from "./pages/Main"
import Nav from "./components/Nav";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import LeaderBoard from "./pages/LeaderBoard"
import trial from "./pages/trial"
import Logout from "./pages/Logout"

function App() {
  
 

  return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/RPS" component={RPS} />
          <Route exact path="/Leader_Board" component={LeaderBoard} />
          <Route exact path="/Logout" component={Logout} />
          <Route component={trial} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RPS from "./pages/RPS"
import RPSLS from "./pages/RPSLS"
import RPSonline from "./pages/RPS-online"
import RPSLSonline from "./pages/RPSLS-online"
import Main from "./pages/Main"
import Nav from "./components/Nav";
import UserAuth from "./pages/UserAuth"
import LeaderBoard from "./pages/LeaderBoard"
import Logout from "./pages/Logout"

function App() {
  
   return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/RPS" component={RPS} />
          <Route exact path="/RPS_Online" component={RPSonline} />
          <Route exact path="/RPSLS" component={RPSLS} />
          <Route exact path="/RPSLS_Online" component={RPSLSonline} />
          <Route exact path="/Leader_Board" component={LeaderBoard} />
          <Route exact path="/SignUp" component={UserAuth} />
          <Route exact path="/Login" component={UserAuth} />
          <Route exact path="/Password" component={UserAuth} />
          <Route exact path="/SignOut" component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

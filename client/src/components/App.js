import React, { Component } from "react";
import { Router} from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import NavBar from "./modules/NavBar.js";
import Game from "./pages/Game.js";
import FindGames from "./pages/FindGames.js";
import Create from "./pages/Create.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    }).catch((error) =>{
      console.log(error);
    });
  }

  handleLogin = (res) => {
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    }).catch((err) => {
      alert(err);
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <div className = "u-app u-flexColumn">
          <div className = "u-flexRow" >
            <NavBar
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
            />
          </div>
            <Router className = "u-flex u-grow">
              <Home path="/"/>
              <FindGames path="/public" />
              <Game path="/game/:game_id"/>
              <Create path="/create"/>
              <NotFound default/>
            </Router>
        </div>
      </>
    );
  }
}

export default App;

import React, {Component} from "react";
import {Redirect} from "@reach/router";
import Banner from "../modules/Banner.js";
import MainGameButton from "../modules/MainGameButton.js";
import FindGamesButton from "../modules/FindGamesButton.js";
import {get} from "../../utilities.js"

import "../modules/Banner.css";
import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect : false
    };
  }
  componentDidMount(){

  }
  startCreating = () => {
    this.setState({redirect : "create"});
  }
  mainGame = () => {
    get("/api/createMainGame").then(() => {console.log("success");}).catch((err) => {console.log("main game not created");});
  }
  render(){
    if(this.state.redirect){
      return (<Redirect to="/create"/>);
    }
    return (
      <>
        <div className = "u-flexColumn u-grow" >
          <div className = "u-groow">
            <Banner/>
          </div>
          <div className = "u-flex-justifyCenter u-flex-alignCenter">
            <button className = "u-textbox" onClick = {this.startCreating}> Start Creating </button>
            <button className = "u-textbox" onClick = {this.mainGame}> Initiate Main Game </button>
          </div>
          <div className = " u-grow u-flexRow">
            <div className = "u-grow" >
              <MainGameButton />
            </div>
            <div className = "u-groow" >
              <FindGamesButton />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;

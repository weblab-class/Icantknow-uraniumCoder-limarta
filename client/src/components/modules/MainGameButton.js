import React, {Component} from "react";
import {Redirect} from "@reach/router";
import {get} from "../../utilities.js";

import "../../utilities.css";
import "../pages/Home.css";

class MainGameButton extends Component{
  constructor(props){
    super(props);
    this.state = {redirect: null, mainGameId: null};
  }
  componentDidMount(){
    get("/api/maingame").then((data) => {
      this.setState({mainGameId: data.gameId});
    });
  }
  toMain = () =>{
    this.setState({redirect: "main"});
  }
  render(){
    if(this.state.redirect && this.state.mainGameId){
      return (<Redirect to= {`/game/${this.state.mainGameId}`} />);
    }
    return (
      <>
        <div className = "MainGameButton-mainButton" onClick = {this.toMain}/>
      </>
    );
  }
}

export default MainGameButton;

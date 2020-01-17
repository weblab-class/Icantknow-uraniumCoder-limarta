import React, {Component} from "react";
import {Redirect} from "@reach/router";
import "../../utilities.css";
import {get, post} from "../../utilities.js";

/*
@gameId : The ID of current game. Default is the main game
*/
class Game extends Component{
  constructor(props){
    super(props);
    this.state = {canPlay: false};
  }
  componentDidMount(){
    // Checks if game belongs to the logged in user
    Promise.all([
      get("/api/whoami"),
      get("/api/gameowner", {gameId: this.props.gameId}),
    ]).then((allData) => {
      if(allData[0] && allData[0]._id == allData[1]){
        this.setState(canPlay: true);
      }
    });
  }
  render(){
    return (
      <>
      </>
    );
  }
}

export default Game;

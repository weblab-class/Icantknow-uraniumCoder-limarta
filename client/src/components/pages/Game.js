import React, {Component} from "react";
import {Redirect} from "@reach/router";
import {get, post} from "../../utilities.js";

import "../../utilities.css";
import "./Game.css";

import MessageBox from "./../modules/MessageBox";
import Element from "./../modules/Element";

/*
@gameId : The ID of current game. Default is the main game
*/
class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      canPlay: false,
      found: ["air", "earth"],
      textMessage: "adasds",
    }
  }
  
  componentDidMount(){
    // Checks if game belongs to the logged in user
    Promise.all([
      get("/api/whoami"),
      get("/api/gameowner", {gameId: this.props.gameId}),
    ]).then((allData) => {
      if(allData[0] && allData[0]._id == allData[1]){
        this.setState({canPlay: true});
      }
    });
  }

  sendElements = (el1, el2) => {
    get("/api/querycombine", [el1, el2]).then(obj => {
      if (obj) {
        if (!this.state.found.includes(obj)) {
          this.setState({
            found: this.state.found.concat(obj),
            textMessage: "found stuff"
          })
          // give MessageBox something about
        }
        else {
          this.setState({
            textMessage: "already found this",
          })
        }
      } else {
        this.setState({
          textMessage: "not yet",
        })
      }
    });
  }

  showAllElements = () => {
    let elementList = [];

    for (let i = 0; i < this.state.found.length; i++) {
      elementList.push(<Element element={this.state.found[i]} />);
    }

    return elementList;
  }

  render(){
    return (
      <>
        <MessageBox message={this.state.textMessage} />
        {this.showAllElements()}
        <div class="main-game-box">
          hi
        </div>
      </>
    );
  }
}

export default Game;
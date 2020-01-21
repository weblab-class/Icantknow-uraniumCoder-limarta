import React, {Component} from "react";
import {Redirect} from "@reach/router";
import {get, post} from "../../utilities.js";

import "../../utilities.css";
import "./Game.css";

import MessageBox from "./../modules/MessageBox";
import Element from "./../modules/Element";
import ElementName from "./../modules/ElementName";

/*
@gameId : The ID of current game. Default is the main game
*/
class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      canPlay: false,
      found: ["air", "water", ],
      textMessage: "adasds",
      elementsInPlay: [],
      height: 1
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
    get("/api/querycombine", {elements: [el1, el2]}).then(obj => {
      if (obj) {
        if (!this.state.found.includes(obj.products)) {
          this.setState({
            found: this.state.found.concat(obj.products),
            textMessage: "found stuff"
          })
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
      elementList.push(<ElementName
        element={this.state.found[i]}
        clickFun = {() => {this.makeElementsInPlay(this.state.found[i])}}
      />);
    }

    return elementList;
  }

  makeElementsInPlay = (name) => {
    this.setState({
      elementsInPlay: this.state.elementsInPlay.concat([[name, this.state.height]]),
      height: this.state.height + 1,
    })
  }

  showElementsInPlay = () => {
    let elementList = [];

    for (let i = 0; i < this.state.elementsInPlay.length; i++) {
      elementList.push(<Element
        element={this.state.elementsInPlay[i]}
        // clickFun = {() => {this.makeElementsInPlay(this.state.found[i])}}
      />);
    }

    return elementList;
  }

  dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
  }

  drop_handler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("application/my-app");
    ev.target.appendChild(document.getElementById(data));
  }

  render(){
    return (
      <>
        <div className="main-game-box u-grow">
          <div className="element-list u-grow">
            {this.showAllElements()}
          </div>
          <div className="combining-area u-grow" id = "target" ondrop="drop_handler(event)" ondragover="dragover_handler(event)">
            <MessageBox message={this.state.textMessage} />
            {this.showElementsInPlay()}
          </div>
          <div className="chat u-grow">
          </div>
        </div>
      </>
    );
  }
}

export default Game;

/*
elementsInPlay.concat([[this.state.found[i], window.screenX, window.screenY]]);




*/
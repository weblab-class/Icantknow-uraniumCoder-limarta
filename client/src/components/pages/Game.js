import React, {Component} from "react";
import {Redirect} from "@reach/router";
import {get, post} from "../../utilities.js";

import "../../utilities.css";
import "./Game.css";

import MessageBox from "./../modules/MessageBox";
import SingleElement from "./../modules/Element";

/*
@gameId : The ID of current game. Default is the main game
*/
class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      canPlay: false,
      found: [],
      textMessage: "adasds",
    }
  }

  componentDidMount(){
    // Checks if game belongs to the logged in user
    Promise.all([
      get("/api/whoami"),
      get("/api/gameowner", {gameId: this.props.gameId}),
    ]).then((allData) => {
      if(allData[0] && allData[0]._id == allData[1].ownerId){
        this.setState({canPlay: true});
      }
    });
    get("/api/found", {gameId: this.props.gameId}).then((elements) => {
      this.setState({found: elements});
    });
  }

  sendElements = (el1, el2) => {
    get("/api/querycombine", {elements: [el1, el2]}).then((obj) => {
      // if (obj) {
      //   get("/api/found", {gameId: this.props.gameId}).then((elements) => {
      //     if(!elements.elements includes(obj.products)) {
      //       post("api/newElement", {element: obj.products});
      //       this.setState({textMessage: "found stuff"});
      //     }
      //     else {
      //       this.setState({textMessage: "already found this"});
      //     }
      //   });
        if (!this.state.found.includes(obj.products)) {
          post("api/newElement", {element: obj.products}).then(() =>{
            this.setState({
              found: this.state.found.concat(obj.products),
              textMessage: "found stuff"
            })
          });
          // give MessageBox something about
        // }
        else {
          this.setState({
            textMessage: "already found this",
          })
        }
      } else {
        this.setState({
          textMessage: "not combinable",
        })
      }
    });
  }
  //
  // showAllElements = () => {
  //   let elementList = [];
  //
  //   for (let i = 0; i < this.state.found.length; i++) {
  //     elementList.push(<Element element={this.state.found[i]} />);
  //   }
  //
  //   return elementList;
  // }

  render(){
    // if(! this.state.canPlay){
    //   <Redirect
    // }
    return (
      <>
        <MessageBox message={this.state.textMessage} />
        {this.state.found.map((element) => {
          (<SingleElement element = {element}/>);
        }}
        <div class="main-game-box">
          hi
        </div>
      </>
    );
  }
}

export default Game;

import React, {Component} from "react";
import {Redirect} from "@reach/router";
import {get, post} from "../../utilities.js";

import "../../utilities.css";
import "./Game.css";

import MessageBox from "./../modules/MessageBox";
import SingleElement from "./../modules/SingleElement";
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
      textMessage: "Hi!",
      elementsInPlay: [],
      elementnum: 0,
      firstElement: ""
    }
  }

  componentDidMount(){
    
    // Checks if game belongs to the logged in user

    get("/api/canplay", {gameId: this.props.gameId}).then((data) => {
      this.setState({canPlay : data.canPlay});
    });
    // Promise.all([
    //   get("/api/whoami"),
    //   get("/api/gameowner", {gameId: this.props.gameId}),
    // ]).then((allData) => {
    //   if(allData[0] && allData[0]._id == allData[1].ownerId){
    //     this.setState({canPlay: true});
    //   }
    // });
    get("/api/found", {gameId: this.props.gameId}).then((data) => {
      this.setState({found: data.found});
    });
    
  }

  changeElementNum = () => {
    this.setState({
      elementnum: (this.state.elementnum+1)%2
    })
  }

  getElementNum = () => {
    return this.state.elementnum
  }

  setElement = (thing) => {
    if (this.getElementNum() === 0) {
      this.setState({
        firstElement: thing,
      })
    }
    else {
      this.sendElements(this.state.firstElement, thing)
      this.setState({
        firstElement: "",
        elementsInPlay: [],
      })
    }
  }

  sendElements = (el1, el2) => {
    get("/api/querycombine", {elements: [el1, el2]}).then((obj) => {
      if (obj) {
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
          textMessage: "not combinable",
        })
      }
    });
  }

  showAllElements = () => {
    let elementList = [];

    for (let i = 0; i < this.state.found.length; i++) {
      elementList.push(<ElementName
        element={this.state.found[i]}
        clickFun = {() => {
          this.makeElementsInPlay(this.state.found[i], this.getElementNum())
          this.changeElementNum()
          this.setElement(this.state.found[i])
        }}
        key = {this.state.found[i]+i}
      />);
    }

    return elementList;
  }

  makeElementsInPlay = (name, position) => {
    this.setState({
      elementsInPlay: this.state.elementsInPlay.concat([[name, position]]),
    })
  }

  showElementsInPlay = () => {
    let elementList = [];

    for (let i = 0; i < this.state.elementsInPlay.length; i++) {
      elementList.push(<SingleElement
        element={this.state.elementsInPlay[i]}
        key = {this.state.elementsInPlay[i][0]+i}
      />);
    }

    return elementList;
  }

  render(){
    // if(! this.state.canPlay){
    //   <Redirect
    // }
    return (
      <>
        <div className="main-game-box u-grow">
          <div className="element-list u-grow">
            {this.showAllElements()}
          </div>
          <div className="center-of-page u-grow" id = "target">
            <MessageBox message={this.state.textMessage} />
            <div className="combining-area">
              {this.showElementsInPlay()}
            </div>
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

*/
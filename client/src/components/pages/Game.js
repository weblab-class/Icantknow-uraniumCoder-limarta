import React, {Component} from "react";
import {Redirect} from "@reach/router";
import {get, post} from "../../utilities.js";

import "../../utilities.css";
import "./Game.css";

import MessageBox from "../modules/MessageBox.js";
import SingleElement from "../modules/SingleElement.js";
import DraggableSingleElement from "../modules/DraggableSingleElement.js";
import ElementName from "../modules/ElementName.js";
import LogInPrompt from "./LogInPrompt.js"

/*
@gameId : The ID of current game. Default is the main game
*/
class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      canPlay: false,
      found: ["air", "water", ],
      textMessage: "Click Elements From Left to Play. Drag Elements Together to Merge.",
      elementsInPlay: [],
      curId: 0,
    }
  }

  componentDidMount(){
    // Checks if game belongs to the logged in user
    console.log("component mounted lol");
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

  sendElements = (el1, el2) => {
    get("/api/querycombine", {element1: el1.name, element2: el2.name, gameId: this.props.gameId}).then((obj) => {
      if (obj.products) {
        console.log(obj);
      //   get("/api/found", {gameId: this.props.gameId}).then((elements) => {
      //     if(!elements.elements includes(obj.products)) {
      //       post("api/newElement", {element: obj.products});
      //       this.setState({textMessage: "found stuff"});
      //     }
      //     else {
      //       this.setState({textMessage: "already found this"});
      //     }
      //   });
        obj.products.forEach((product) => {
          if (!this.state.found.includes(product)) {
            post("/api/newElement", {gameId: this.props.gameId, element: product}).then((elements) =>{
              this.setState({
                found: this.state.found.concat(product),
                textMessage: "found stuff"
              })
            });
            // give MessageBox something about
          // }
          } else {
            this.setState({
              textMessage: "already found this",
            })
          }
        });
      } else {
        this.setState({
          textMessage: "not combinable",
        })
      }
    });
  }

  makeElementsInPlay = (name) => {
    this.setState({
      elementsInPlay: this.state.elementsInPlay.concat([{
        name: name,
        key: this.state.curId,
        positionX: undefined,
        positionY: undefined,
      }]),
      curId: this.state.curId + 1,
    })
  }

  updateElementPosition = (newx, newy, elementKey) => {
    this.setState({
      elementsInPlay: this.state.elementsInPlay.map((element) => {
        if(element.key == elementKey){
          element.positionX = newx;
          element.positionY = newy;
          this.tryMerge(element);
        }
        return element;
      }),
    })
  }

  tryMerge = (element1) => {
    const other = this.state.elementsInPlay.find((element2) => {
      return (element1.key !== element2.key) &&
      (Math.abs(element2.positionX - element1.positionX) < 30) &&
      (Math.abs(element2.positionY - element1.positionY) < 30);
    });
    if(other){
      console.log("close to each other");
      console.log(other);
      this.sendElements(element1, other);
    }
  }

  render(){
    if(! this.state.canPlay){
     return (<LogInPrompt/>);
    }
    return (
      <>
        <div className="main-game-box u-grow">
          <div className="element-list u-grow">
            {this.state.found.map((element, index) => {
             return (<ElementName
                element = {element}
                clickFun = {() => {
                  this.makeElementsInPlay(element);
                }}
                key = {element + index}
              />);
            })}
          </div>
          <div className="center-of-page u-grow" id = "target">
            <MessageBox message={this.state.textMessage} />
            <div className="combining-area">
              {this.state.elementsInPlay.map((element, index) => {
                return (<DraggableSingleElement
                  element = {element}
                  key = {element.key}
                  update = {this.updateElementPosition}/>);//DraggableSingleElement(element, element[0] + 1);
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

/*

<div className="chat u-grow">
  <div className="element-list">
    {this.state.found.map((element) => {
      return (<SingleElement element = {element}/>);
    })}
  </div>
  asijdfiajdifjaoidfaisdfjo
</div>
*/
export default Game;

/*

*/

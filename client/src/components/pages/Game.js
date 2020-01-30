import React, {Component} from "react";
import {Redirect} from "@reach/router";
import {get, post} from "../../utilities.js";

import "../../utilities.css";
import "./Game.css";

import MessageBox from "../modules/MessageBox.js";
import SingleElement from "../modules/SingleElement.js";
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
      textMessage: "Hi!",
      elementsInPlay: [],
      elementnum: 0,
      firstElement: ""
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

  changeElementNum = () => {
    this.setState({
      elementnum: (this.state.elementnum+1)
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
          post("api/newElement", {gameId: this.props.gameId, element: obj.products}).then((elements) =>{
            this.setState({
              found: this.state.found.concat(obj.products),
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
                  this.makeElementsInPlay(element, this.getElementNum());
                  this.changeElementNum();
                  this.setElement(element);
                }}
                key = {element + index}
              />);
            })}
          </div>
          <div className="center-of-page u-grow" id = "target">
            <MessageBox message={this.state.textMessage} />
            <div className="combining-area">
              {this.state.elementsInPlay.map((element) => {
                return (
                  <div className = "u-drag">
                    <SingleElement element = {element} key = {element[0] + 1}/>
                  </div>);
              })}
            </div>
          </div>
          <div className="chat u-grow">
            <div className="element-list">
              {this.state.found.map((element) => {
                return (<SingleElement element = {element}/>);
              })}
            </div>
            asijdfiajdifjaoidfaisdfjo
          </div>
        </div>
      </>
    );
  }
}

export default Game;

/*

*/

import React, {Component} from "react";
import {Redirect} from "@reach/router";
import {get, post} from "../../utilities.js";

import "../../utilities.css";
import "./Game.css";

import MessageBox from "../modules/MessageBox";
import SingleElement from "../modules/SingleElement";
import ElementName from "../modules/ElementName";

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
      elementList.push(<SingleElement
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
    // if(! this.state.canPlay){
    //   <Redirect
    // }
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
            <div className="element-list">
              {this.state.found.map((element) => {
                (<SingleElement element = {element}/>);
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
elementsInPlay.concat([[this.state.found[i], window.screenX, window.screenY]]);




*/

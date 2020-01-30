import React, {Component} from "react";
import {Link} from "@reach/router";
import reactable from "reactablejs"

import "./../pages/Game.css";

import SingleElement from "../modules/SingleElement.js";

// const DraggableElement = reactable(SingleElement);

class DraggableSingleElement extends Component{
  constructor(props){
    super(props);
    this.state = {
      x: 70,
      y: 70
    }
    this.hiddenState = {x: 0, y: 0}
  }

  componentDidMount(){

  }

  setCoordinate = (dx, dy) => {
    this.setState ({
      x: this.state.x + dx,
      y: this.state.y + dy
    })
    this.updatePosition(this.hiddenState.x + dx, this.hiddenState.y + dy);
  }

  updatePosition = (newx, newy) => {
    this.hiddenState.x = newx;
    this.hiddenState.y = newy;
    this.props.update(newx, newy, this.props.element.key);
  }

  dragstart_handler = (ev) => {
    // Add the target element's id to the data transfer object
    this.updatePosition(ev.clientX, ev.clientY);
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
    console.log("dragging");
  }

  // [coordinate, setCoordinate] = React.useState({ x: 0, y: 0 });

  render(){
    return (
      <>
        <SingleElement
          draggable = "true"
          ondrop = { (event) => {
            console.log(event);
            console.log("screen" + event.screenX);
            console.log("client" + event.clientX);
            console.log("movement" + event.movementX);
            const ax = event.clientX - this.hiddenState.x;
            const ay = event.clientY - this.hiddenState.y;
            console.log(ax);
            this.setCoordinate(ax, ay);
            // action('DragMove')(event);
          }}
          dragstart_handler = {this.dragstart_handler}
          element = {this.props.element}
          dispx = {this.state.x}
          dispy = {this.state.y}
        />
      </>
    );
  }
}

/*

const DraggableSingleElement = (el, k) => {
  const [coordinate, setCoordinate] = React.useState({ x: 70, y: 70 });
  return (
    <DraggableElement
      draggable
      onDragMove={event => {
        const { dx, dy } = event;
        setCoordinate(prev => ({
          x: prev.x + dx,
          y: prev.y + dy,
        }));
        action('DragMove')(event);
      }}
      x={coordinate.x}
      y={coordinate.y}
      element = {el}
      key = {k}
    />
  );
}

*/

export default DraggableSingleElement;

/*
draggable="true" onDragStart="dragstart_handler(event)"
                  draggable
                  onDragMove = { (event) => {
                    const {dx,dy} = event;

                  }}
                  */

/*
    const rect = document.getElementById("merging-area").getBoundingClientRect();
    let newx = this.state.x;
    if (newx < -1) {
      newx = -1;
    }
    if (newx > rect.right-rect.left-71) {
      newx = rect.right-rect.left-71;
    }
    let newy = this.state.y;
    if (newy < -1) {
      newy = -1;
    }
    if (newy > rect.bottom-rect.top-71) {
      newy = rect.bottom-rect.top-71;
    }
*/
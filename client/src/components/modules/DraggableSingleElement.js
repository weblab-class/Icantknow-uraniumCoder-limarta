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
  }

  componentDidMount(){

  }

  setCoordinate = (newx, newy) => {
    this.setState ({
      x: this.state.x + newx,
      y: this.state.y + newy
    })
  }



  // [coordinate, setCoordinate] = React.useState({ x: 0, y: 0 });

  render(){
    return (
      <>
        <SingleElement
          draggable
          onDragMove = { (event) => {
            const { dx, dy } = event;
            setCoordinate(dx, dy);
            action('DragMove')(event);
          }}
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
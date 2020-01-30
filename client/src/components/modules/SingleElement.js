import React, {Component} from "react";
import {Link} from "@reach/router";

import "./../pages/Game.css";

class SingleElement extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  dragstart_handler = function (ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
  }

  getX = () => {
    if (this.props.element[1] === 0) {
      return "20%"
    }
    else {
      return "80%"
    }
  }

  render(){
    return (
      <>
        <div className="element-box u-drag" draggable="true" onDragStart={this.dragstart_handler}>
        <div style={{
          position: "absolute",
          left: this.getX(),
          top: "30vh",
          textAlign: "center",
          border: "1px",
          "border-style": "solid",
          "border-color": "#000000",
          width: "70px",
          height: "70px",
        }}>
          {this.props.element[0]}
        </div>
        </div>
      </>
    );
  }
}

export default SingleElement;

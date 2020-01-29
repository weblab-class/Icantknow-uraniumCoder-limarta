import React, {Component} from "react";
import {Link} from "@reach/router";

import "./../pages/Game.css";

class SingleElement extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  dragstart_handler = (ev) => {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
    console.log("dragging");
  }

  render(){
    return (
      <>
        <div className="element-box" draggable="true" onDragStart={this.dragstart_handler}
          onDrop = {this.props.ondrag}
          onDragOver = {function (ev) {
            ev.preventDefault();
          }}
          onDragEnter = {function (ev) {
            ev.preventDefault();
          }}
          style={{
            position: 'absolute',
            left: this.props.dispx,
            top: this.props.dispy,
            width: "70px",
            height: "70px",
            border: "1px solid black",
            boxSizing: "border-box"
          }}
        >
          {this.props.element+"\n"+this.props.dispx+"\n"+this.props.dispy}
        </div>
      </>
    );
  }
}

export default SingleElement;

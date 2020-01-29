import React, {Component} from "react";
import {Link} from "@reach/router";

import "./../pages/Game.css";

class SingleElement extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
  }

  render(){
    return (
      <>
        <div className="element-box" draggable="true" onDragStart="dragstart_handler(event)"
          style={{
            position: 'absolute',
            left: this.props.x,
            top: this.props.y,
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

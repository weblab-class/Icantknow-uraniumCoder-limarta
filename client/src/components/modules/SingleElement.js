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
        <div className="element-box" draggable="true" onDragStart="dragstart_handler(event)">
          {this.props.element[0]}
        </div>
        <style>left: 100px; top 100px;</style>
      </>
    );
  }
}

export default SingleElement;

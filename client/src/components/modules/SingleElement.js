import React, {Component} from "react";
import {Link} from "@reach/router";

import "./../pages/Game.css";

class SingleElement extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render(){
    return (
      <>
        <div className="element-box" draggable="true" onDragStart={this.props.dragstart_handler}
          onDragEnd = {this.props.ondrop}
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
          {this.props.element.name+"\n"+this.props.dispx+"\n"+this.props.dispy}
        </div>
      </>
    );
  }
}

export default SingleElement;

import React, {Component} from "react";
import {Link} from "@reach/router";

import "./../pages/Game.css";
import Element from "./../modules/Element";

class ElementName extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render(){
    return (
      <>
        <div
          className="element-name"
          onClick = {() => {this.props.clickFun()}}
        >
          {this.props.element}
        </div>
      </>
    );
  }
}

export default ElementName;
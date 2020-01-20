import React, {Component} from "react";
import {Link} from "@reach/router";

import "./../pages/Game.css";

class ElementName extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render(){
    return (
      <>
        <div className="element-name">
          {this.props.element}
        </div>
      </>
    );
  }
}

export default ElementName;
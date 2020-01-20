import React, {Component} from "react";
import {Link} from "@reach/router";

import "./../pages/Game.css";

class Element extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render(){
    return (
      <>
        <div class="element-box">
          {this.props.element}
        </div>
      </>
    );
  }
}

export default Element;
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
        <div className="element-box">
          {this.props.element}
        </div>
      </>
    );
  }
}

export default SingleElement;

import React, {Component} from "react";
import {Link} from "@reach/router";

class Element extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }
  render(){
    return (
      <>
        <h2>{this.props.element}</h2>
      </>
    );
  }
}

export default Element;
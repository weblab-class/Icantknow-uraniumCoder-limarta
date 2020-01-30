import React, {Component} from "react";
import {Redirect} from "@reach/router";

import "./Banner.css";
import "../../utilities.css";

class Banner extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  render(){
    return (
      <div className = "Banner-Image u-textCenter">
        <div className = "Banner-innerIm" >
        </div>
        <h1>Creative Alchemy</h1>
      </div>
    );
  }
}

export default Banner;

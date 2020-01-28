import React, {Component} from "react";

import "../../utilities.css";

class LogInPrompt extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){}
  render(){
    return (
      <>
        <div className = "u-grow u-textCenter"> Please Log In First </div>
      </>
    )
  }
}

export default LogInPrompt;

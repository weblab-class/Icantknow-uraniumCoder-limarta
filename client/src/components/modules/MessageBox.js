import React, {Component} from "react";
import {Link} from "@reach/router";

import "./../pages/Game.css";

class MessageBox extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render(){
    return (
      <>
          <div className="message-box">
            {this.props.message}
          </div>
      </>
    );
  }
}

export default MessageBox;
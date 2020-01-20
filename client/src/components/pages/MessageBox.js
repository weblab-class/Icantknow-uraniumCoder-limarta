import React, {Component} from "react";
import {Link} from "@reach/router";

class MessageBox extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }
  render(){
    return (
      <>
          <h4>{this.props.message}</h4>
      </>
    );
  }
}

export default MessageBox;
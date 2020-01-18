import React, {Component} from "react";
import {Redirect} from "@reach/router";

import "../../utilities.css";

class MainGameButton extends Component{
  constructor(props){
    super(props);
    this.state = {userId: null, gameId: null, loggedIn : false};
  }
  componentDidMount(){
  //   get("/api/whoami").then((user) => {
  //     if(!user){
  //       return;
  //     }
  //     this.setState({userId: user._id})
  //     return get("/api/mainGame");
  //   })
  }
  render(){
    return (
      <>
      </>
    );
  }
}

export default MainGameButton;

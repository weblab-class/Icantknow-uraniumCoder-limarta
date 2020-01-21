import React, {Component} from "react";
import {Redirect} from "@reach/router";

import "../../utilities.css";
import "../pages/Home.css";

class FindGamesButton extends Component{
  constructor(props){
    super(props);
    this.state = {redirect: null};
  }
  componentDidMount(){

  }
  toPublic = () =>{
    this.setState({redirect: "public"});
  }
  render(){
    if(this.state.redirect){
      return (<Redirect to="/public" />);
    }
    return (
      <>
        <div className = "FindGamesButton-findButton" onClick = {this.toPublic}/>
      </>
    );
  }
}

export default FindGamesButton;

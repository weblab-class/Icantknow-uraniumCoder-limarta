import React, {Component} from "react";
import {Redirect} from "@reach/router";
import {get} from "../../utilities.js"

import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect : false
    };
  }
  componentDidMount(){

  }
  startCreating = () => {
    this.setState({redirect : "create"});
  }
  render(){
    if(this.state.redirect){
      return (<Redirect to="/create"/>);
    }
    return (
      <>
      </>
    );
  }
}

export default Home;

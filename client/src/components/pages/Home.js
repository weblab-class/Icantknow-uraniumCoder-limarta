import React, {Component} from "react";
import Banner from "../modules/Banner.js";
import {Link} from "@reach/router"

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
  startCreating(){
    this.setState({redirect : "create"});
  }
  render(){
    if(this.state.redirect){
      return (<Redirect to="/create"/>);
    }
    return (
      <>
        <Banner/>
        <div onClick = {this.startCreating}/> // some CSS code for this button to make it smaller
        <div className = "u-flex"/>
          <div className = "u-grow" />
            <MainGameButton />
          </div>
          <div className = "u-groow" />
            <FindGamesButton />
          </div>
        </div>
      </>
    );
  }
}
